# BHPA AWS infrastructure

The Boston Heat Pump Accelerator is moving to AWS because NERC OpenShift is shutting down.
It runs in the shared Code for Boston account (**142103676030**) in **us-east-1**.

- **Frontend:** the React SPA is served from **S3 + CloudFront**.
- **Backend:** the Rails API runs on **ECS Fargate** behind one shared **ALB**. Its image comes from **GHCR**.
- **Database:** **RDS PostgreSQL**, single-AZ.
- **TLS:** **ACM** certificates, which renew themselves.

Running everything costs about $65–75/mo.

## Running the AWS CLI

Pass the profile and region on every command. `--profile` overrides any credentials already set in the environment:

```sh
aws --profile codeforboston --region us-east-1 sts get-caller-identity
# expect Account 142103676030
```

In the commands below, `cfb` stands for `aws --profile codeforboston --region us-east-1`.

## Stacks

| Stack | Template | Holds |
|---|---|---|
| `bhpa-foundation` | `foundation.yaml` | VPC with 2 public and 2 private subnets, the security groups, RDS `bhpa-postgres` (PG 18, `db.t4g.micro`, encrypted, 14-day PITR) |
| `bhpa-iam` | `iam.yaml` | GitHub OIDC provider, the deploy role `bhpa-github-deploy`, and the ECS execution and task roles |
| `bhpa-app` | `app.yaml` | ALB with its target groups, ECS task definitions and services (prod + staging), CloudFront distributions and OAC |

**Created by hand, not in a template:**
- **Secrets Manager:** `bhpa/rails-master-key`, `bhpa/ghcr-pull` (a GHCR read token), `bhpa/db-app-credentials`, and `bhpa/prod-admin-login` (written by `bootstrap-database`).
- **ECS:** cluster `bhpa`.
- **S3:** buckets `bhpa-frontend-prod` and `bhpa-frontend-staging`.
- **ACM:** the ALB cert (`api`, `api.staging`) and the CloudFront cert (apex, `www`, `staging`). Hover DNS validates both. See `hover-dns-records.md`.

## Deploys

`.github/workflows/deploy.yml` handles every code deploy. A push to `main` deploys staging, and a
published release deploys prod. For each deploy it:
1. Builds the backend image and pushes it to GHCR.
2. Registers a task definition revision with the new image.
3. Runs `rails db:migrate` as a one-off task.
4. Rolls the ECS service.
5. Builds the frontend, syncs it to S3, and invalidates CloudFront.

GitHub environment branch rules limit where each environment can deploy from:
- **`staging`:** only from `main`.
- **`production`:** only from release tags (`v*` or `[0-9]*`).

The deploy role trusts only those two environments.

**CI owns the image tag.** When you update `bhpa-app`, pass the tag that's running now:

```sh
tag=$(cfb ecs describe-task-definition --task-definition bhpa-backend-prod \
  --query 'taskDefinition.containerDefinitions[0].image' --output text | cut -d: -f2)
cfb cloudformation deploy --stack-name bhpa-app --template-file app.yaml --tags Project=bhpa \
  --parameter-overrides ImageTag=$tag
```

Otherwise the services roll back to whatever tag the stack had last.

**Rails console:** the services have ECS Exec enabled.

```sh
cfb ecs execute-command --cluster bhpa --task <task-id> --container backend --interactive \
  --command "bundle exec rails console"
```

## Migration status

As of 2026-09-29, **staging runs on AWS. Production does not.**

| Step | State |
|---|---|
| 1. Certificates | Done. Both are ISSUED. |
| 2. `bhpa-iam` | Done. |
| 3. `bhpa-app` | Done. Both services run 1 task each, and both ALB targets are healthy. |
| 4. Database | Done. Both databases are loaded, and the seeded prod passwords are replaced. |
| 5. Migration PR | Merged (#741). |
| 6. Services and certs | Done. The stack has both cert ARNs and both services run. |
| 7. DNS, staging | Done. `staging` and `api.staging` are CNAMEs at Hover to CloudFront and the ALB. |
| 7. DNS, prod | **Not done.** `www` and `api` still point at NERC. |
| 8. Decommission OpenShift | Not started. |

## Remaining work

1. **Smoke-test staging.** Log in, log out, reset a password, and check that reset email arrives.
2. **Deploy prod.** Publish a GitHub release. The prod bucket is empty until then, and the prod service still runs the image from before `/up` existed until the release deploys.
3. **Copy production data.** The prod database holds only seeds. If OpenShift has real data, dump and restore it into RDS during a short write freeze, before you move DNS.
4. **Move prod DNS.** Lower the TTLs a day ahead, then see `hover-dns-records.md`, section 2.
5. **Decommission OpenShift** after a soak period:
   1. Delete `delete-certificates.yml`.
   2. Remove the `OPENSHIFT_*` secrets and the old `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` repo secrets.
   3. Delete the wildcard `*` CNAME at Hover. It sends every unlisted name to NERC.
   4. Archive `s3://bostonhpa.org-database-backup`.

## Bring-up checklist

Use this to rebuild the stack from nothing.

1. **Certificates.** The Hover CNAMEs are in `hover-dns-records.md`, section 1. Wait until both certs show ISSUED:
   `cfb acm list-certificates --query "CertificateSummaryList[].[DomainName,Status]"`
2. **Update `bhpa-iam`.** This limits the deploy role's trust, adds ECS Exec, and lets CI read logs and stack outputs:
   `cfb cloudformation deploy --stack-name bhpa-iam --template-file iam.yaml --capabilities CAPABILITY_NAMED_IAM --tags Project=bhpa`
3. **Create `bhpa-app` with nothing running.** Services at 0 tasks, HTTP only until the certs are passed in:
   `cfb cloudformation deploy --stack-name bhpa-app --template-file app.yaml --tags Project=bhpa --parameter-overrides ImageTag=<main sha> ProdDesiredCount=0 StagingDesiredCount=0`
4. **Load the database.** `ruby infra/aws/bootstrap-database` creates the role and databases, loads the schema and seeds, and replaces the public seed passwords in prod.
5. **Merge to `main`.** The staging deploy pushes an image that includes `/up`.
6. **Start the services and add the certs:**
   `… --parameter-overrides ImageTag=<that sha> ProdDesiredCount=1 StagingDesiredCount=1 AlbCertArn=<arn> CloudFrontCertArn=<arn>`
7. **Verify, then move DNS.** See `hover-dns-records.md`, section 2. Move staging first, then prod after a release.

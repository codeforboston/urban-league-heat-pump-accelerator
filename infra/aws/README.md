# BHPA AWS infrastructure

Infrastructure for migrating the Boston Heat Pump Accelerator off NERC OpenShift
(being shut down) to AWS. Account **142103676030** (shared Code for Boston account),
region **us-east-1**. Full design: `~/.claude/plans/can-you-review-our-clever-bubble.md`.

Target architecture: React SPA on **S3 + CloudFront**, Rails API on **ECS Fargate**
behind a shared **ALB** (image pulled from **GHCR**), **RDS PostgreSQL** (single-AZ),
**ACM** for auto-renewing TLS. Estimated ~$65–75/mo when fully running.

## Running the AWS CLI (important)

The shell has ambient **TED-account** credentials that override `AWS_PROFILE`. Always
pin the profile with the flag and strip the ambient creds:

```sh
env -u AWS_ACCESS_KEY_ID -u AWS_SECRET_ACCESS_KEY -u AWS_SESSION_TOKEN \
  AWS_PROFILE=codeforboston AWS_REGION=us-east-1 aws sts get-caller-identity
# expect Account 142103676030
```

## Deployed so far

| Stack / resource | Notes |
|---|---|
| CFN `bhpa-foundation` (`foundation.yaml`) | VPC `10.0.0.0/16`, 2 public + 2 private subnets (us-east-1a/1b), IGW, SGs `bhpa-alb-sg`/`bhpa-app-sg`/`bhpa-rds-sg`, **RDS `bhpa-postgres`** (PG 18.4, `db.t4g.micro`, private, encrypted, 14-day backups + PITR, deletion protection) |
| CFN `bhpa-iam` (`iam.yaml`) | GitHub OIDC provider, deploy role `bhpa-github-deploy`, `bhpa-ecs-task-execution`, `bhpa-ecs-task` |
| Secrets Manager | `bhpa/rails-master-key`, `bhpa/ghcr-pull` (reused OpenShift GHCR token), `bhpa/db-app-credentials` |
| ECS | cluster `bhpa` |
| S3 | `bhpa-frontend-prod`, `bhpa-frontend-staging` (public access blocked) |
| ACM | ALB cert (`api`, `api.staging`) + CloudFront cert (apex, `www`, `staging`) — DNS-validated via Hover (`hover-dns-records.md`) |

Deploy/update a stack:
```sh
env -u AWS_ACCESS_KEY_ID -u AWS_SECRET_ACCESS_KEY -u AWS_SESSION_TOKEN \
  AWS_PROFILE=codeforboston AWS_REGION=us-east-1 \
  aws cloudformation deploy --stack-name bhpa-foundation \
  --template-file foundation.yaml --tags Project=bhpa
```

## Remaining steps (each begins/continues ongoing spend — do when ready)

1. **DB restore** (~pennies, one-off). Bastion IAM role `bhpa-restore-bastion` is
   already created. Launch a short-lived `t3.micro` in `subnet-0ed4844590a3e96a6` with
   SG `sg-003d8fccf83a71f89` and that instance profile; via SSM `dnf install postgresql15`,
   pull master creds from the RDS-managed secret + app password from
   `bhpa/db-app-credentials`, create role `boston_heat_pump_accelerator` + databases
   `..._production`/`..._staging`, `pg_restore` the latest
   `s3://bostonhpa.org-database-backup/*.bak` into `_production`, verify counts, then
   **terminate the instance**. (Never print PII rows.)
2. **ALB + target groups** (~$18/mo). Shared ALB in the public subnets, HTTPS:443 with
   the ALB ACM cert, host rules: `api.bostonhpa.org`→prod TG, `api.staging`→staging TG,
   HTTP:80→443 redirect. Health check path `/up`.
3. **ECS task defs + services** (~$27/mo). Task defs pull `ghcr.io/codeforboston/bhpa-backend`
   via `repositoryCredentials` = `bhpa/ghcr-pull`, inject secrets, run in public subnets
   (`assignPublicIp`), app SG. 1 task each (prod 0.5vCPU/1GB, staging 0.25/0.5).
4. **CloudFront** (usage-based). Two distributions (prod + staging) over the S3 buckets
   with the CloudFront cert; SPA fallback = custom error 403/404 → `/index.html` (200).
5. **Workflow cutover** (repo). Add `aws-deploy.yml`, rewrite `deploy.yml`, delete
   `openshift.yml` / `delete-certificates.yml` / `db-backup-image.yml`, and drop
   `rails db:prepare` from `backend/start.sh` (migrations become a pre-deploy ECS task).
6. **DNS traffic cutover at Hover**. Point `api`/`api.staging` → ALB, `www`/`staging` →
   CloudFront; keep apex forwarding to `www`.
7. **Decommission OpenShift** after a soak period.

## Current burn
Only **RDS `bhpa-postgres`** is billing (~$15/mo). ALB/Fargate/CloudFront are not yet
created, so no charges from those until step 2+.

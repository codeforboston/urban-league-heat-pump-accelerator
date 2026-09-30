# DNS records to add at Hover (bostonhpa.org)

The domain's authoritative DNS is **Hover** (registrar delegates to `ns1/ns2.hover.com`).
Add the records below in the Hover DNS editor. TTL: default/300s is fine.

## 1. ACM certificate validation (add now — enables HTTPS)

These are CNAME records that prove domain ownership to AWS so the certificates issue
and then **auto-renew forever** (no more manual cert renewals). Leave them in place
permanently. Enter the **host** portion without the trailing `.bostonhpa.org` if Hover
appends the domain automatically (shown here fully-qualified for clarity).

| Host (Name) | Type | Value |
|---|---|---|
| `_74eb77a78a731077210278eb029aa2e1.api` | CNAME | `_08ac57f9a7487c11b51b166883ba8179.jkddzztszm.acm-validations.aws.` |
| `_696eac817e979eb9632ff2299f2bdea9.api.staging` | CNAME | `_49e2f58e30f7582a4e99360e78cb3f50.jkddzztszm.acm-validations.aws.` |
| `_c469a6d91f3c780ff87b1fc98f7dd232` (apex) | CNAME | `_55effbdb766c33bb481b344fc8753a15.jkddzztszm.acm-validations.aws.` |
| `_3ff625582e0a994e5dc8515428e54bd2.staging` | CNAME | `_c362ac1120f7e8bbf98ef79226ee991a.jkddzztszm.acm-validations.aws.` |
| `_01e65db393e4f06a194650ce985321f6.www` | CNAME | `_cf0370703fadde2668a4ef15c873c609.jkddzztszm.acm-validations.aws.` |

## 2. Traffic cutover records

Add each record as its own CNAME. An explicit record overrides the wildcard `*` CNAME to NERC.

| Host | Type | Points to | State |
|---|---|---|---|
| `staging` | CNAME | `d2n6ie0ose2o82.cloudfront.net` | Done 2026-09-29 |
| `api.staging` | CNAME | `bhpa-alb-616399999.us-east-1.elb.amazonaws.com` | Done 2026-09-29 |
| `www` | CNAME | `d1t4ey3k8mttmu.cloudfront.net` | Change at prod cutover |
| `api` | CNAME | `bhpa-alb-616399999.us-east-1.elb.amazonaws.com` | Change at prod cutover |
| apex `bostonhpa.org` | Keep the Hover forward to `www`, or ALIAS/ANAME to `d1t4ey3k8mttmu.cloudfront.net` | — | Change at prod cutover |

`www` and `api` already exist and point at NERC. Edit them, don't add duplicates.

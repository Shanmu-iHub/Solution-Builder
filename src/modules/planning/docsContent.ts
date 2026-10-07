import { DocType } from './types';

const header = (type: string, name: string, abbr: string) => `# ${type}

| | |
|---|---|
| **Project** | ${name} |
| **Document ID** | ${abbr}-001 |
| **Version** | 1.0 (generated draft) |
| **Status** | Draft for architecture review |
| **Owner** | Solution Architecture |
| **Last updated** | ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} |

> Generated from the validated problem statement, the confirmed Idea Brief and the approved solution blueprint. Items marked **(assumption)** need confirmation before build.

`;

export const makeDocContent = (type: DocType, name: string): string => {
  const bodies: Record<DocType, string> = {
    /* ──────────────────────────────────────────────────────────── */
    'Solution Architecture Document': `## 1. Purpose and scope
This document describes the target architecture for **${name}**: the business context it serves, the architectural style, the significant decisions behind it, how it meets the agreed quality attributes, and the risks that remain. It is the reference for every other design document in the set (TDD, HLD, LLD, IDD, INDD, SDD, DDD, AISDD and the API list).

**In scope**
- Case management, knowledge retrieval, AI-assisted drafting, notifications and analytics
- Integration with the existing CRM, identity provider, email/SMS gateway and data warehouse
- Web application for staff and a lightweight customer portal

**Out of scope (release 1)**
- Replacement of the core billing system
- Voice channel and real-time phone transcription
- Mobile native applications (responsive web only)

## 2. Business context
| Driver | Detail | Source |
|---|---|---|
| Rising cost-to-serve | Cost per resolved case has grown 18% year on year while volumes grew 12% | Problem statement |
| Fragmented knowledge | Agents search five tools and give inconsistent answers | Discovery interviews |
| Customer expectation | 62% of customers expect an answer within one hour | Customer survey |
| Audit pressure | Regulators require a complete history of decisions and data access | Compliance review |

### Stakeholders and concerns
| Stakeholder | Primary concern | How the architecture responds |
|---|---|---|
| Head of Operations | Resolution time and agent productivity | Unified case workspace, AI drafting, routing |
| Compliance Officer | Auditability and data protection | Immutable audit log, PII redaction, role-based access |
| IT Security | Attack surface, identity, secrets | SSO, private network, secret vault, threat model (SDD) |
| Customer Experience Lead | Consistency of answers and tone | Central knowledge with ownership, grounded AI |
| Finance | Cost of ownership | Modular monolith, managed services, usage-based AI cost controls |

## 3. Architecture overview
### 3.1 Style
A **modular monolith** with an internal event bus. Each module owns its data and exposes a narrow interface; modules may later be extracted into services without changing their contracts.

\`\`\`
 Customers / Staff
        │
 ┌──────▼───────┐   ┌───────────────┐
 │  Web client  │──▶│  API Gateway  │──▶ Identity Provider (OIDC)
 └──────────────┘   └──────┬────────┘
                           │
      ┌──────────┬─────────┼──────────┬───────────┐
      ▼          ▼         ▼          ▼           ▼
   Cases     Knowledge  Assistant  Notifications  Analytics
      │          │         │          │           │
      └────┬─────┴────┬────┴──────────┘           │
           ▼          ▼                           ▼
      PostgreSQL    Object store + vector index   Warehouse
           ▲
        Redis (queues, cache)
\`\`\`

### 3.2 Modules
| Module | Responsibility | Owns data |
|---|---|---|
| Case Management | Lifecycle, routing, SLAs, timeline | Case, Reply, Assignment |
| Knowledge Hub | Articles, versions, ownership, embeddings, retrieval | Article, Chunk |
| Assistant | Draft replies and summaries with citations; guardrails | Draft, EvaluationRun |
| Notifications | Preference-aware email/SMS/push with retries | Message, Template |
| Analytics | Event ingestion, dashboards, exports | Fact tables |
| Platform | Authentication, RBAC, audit, configuration | User, Role, AuditLog |

## 4. Key architectural decisions
| ID | Decision | Alternatives considered | Rationale |
|---|---|---|---|
| AD-01 | Modular monolith first | Microservices from day one | Smallest team and fastest delivery; lowest operational overhead; clear extraction path |
| AD-02 | PostgreSQL as system of record | Document database | Strong consistency and relational reporting for cases and audit data |
| AD-03 | Retrieval-grounded AI with human approval | Autonomous replies | Controls hallucination risk; keeps accountability with people; satisfies compliance |
| AD-04 | Provider-agnostic LLM gateway | Direct coupling to one provider | Avoids lock-in, enables model comparison and cost control |
| AD-05 | Event outbox for notifications and analytics | Direct calls | Reliable delivery and decoupled reporting |
| AD-06 | OIDC single sign-on | Local accounts | Central lifecycle control and MFA from the corporate IdP |

## 5. Quality attributes
| Attribute | Target | Measured by | Tactics |
|---|---|---|---|
| Availability | 99.9% monthly | Synthetic probes | Multi-AZ database, stateless services, health-based routing |
| Performance | p95 API latency < 300 ms; search < 400 ms | Gateway metrics | Caching, indexes, async work off the request path |
| Scalability | 5,000 concurrent staff sessions, 50 cases/second peak | Load tests | Horizontal scaling, queue back-pressure |
| Security | No critical findings at pen-test | Annual test + continuous scans | See SDD |
| Auditability | 100% of state changes logged | Audit coverage report | Append-only log, outbox pattern |
| Accessibility | WCAG 2.2 AA | Automated + manual audits | Design system, CI checks |

## 6. Deployment view
Containerised workloads run behind a managed load balancer in a private cloud tenant. Three environments (Dev, Staging, Production) with identical topology; infrastructure is defined as code. See the Infrastructure Design Document.

## 7. Risks, assumptions and open issues
| # | Item | Type | Mitigation / owner |
|---|---|---|---|
| R1 | Quality of existing knowledge limits answer quality | Risk | Knowledge clean-up sprint; ownership model — CX Lead |
| R2 | CRM API rate limits may throttle enrichment | Risk | Caching and batch reads — Integration Lead |
| R3 | Data residency requirements per region | Assumption | Single-region launch; confirm with Compliance |
| R4 | Acceptable error rate for AI drafts | Open | Define evaluation thresholds in AISDD — Product Owner |

## 8. Traceability
Business goals GO-01 … GO-05 trace to modules as follows: GO-01 → Case Management, Assistant; GO-02 → Assistant, Analytics; GO-03 → Knowledge Hub; GO-04 → Platform (audit), Notifications; GO-05 → Case Management.`,

    /* ──────────────────────────────────────────────────────────── */
    'Technical Design Document': `## 1. Introduction
This document translates the solution architecture of **${name}** into concrete technical choices that developers can implement. It covers the technology stack, application structure, data access, concurrency, error handling, configuration, testing and observability.

## 2. Technology stack
| Layer | Choice | Version | Why |
|---|---|---|---|
| Web client | Next.js (App Router), React, TypeScript | 15 / 19 / 5.7 | SSR for the portal, strong typing, large ecosystem |
| Styling | Tailwind CSS + internal design system | 3.4 | Consistency and speed |
| API | Node.js 22, Express, Zod | 22 LTS | Shared language with the client, schema validation at the edge |
| Database | PostgreSQL | 16 | Relational integrity, JSONB, full-text search |
| Cache / queue | Redis + BullMQ | 7 | Rate limiting, background jobs |
| Search | pgvector for embeddings, PostgreSQL FTS | 0.7 | Hybrid retrieval without a second datastore |
| Object storage | S3-compatible | — | Attachments and exports |
| AI | LLM gateway (provider-agnostic) | — | Model flexibility and cost control |
| CI/CD | GitHub Actions, container registry, Terraform | — | Repeatable delivery |

## 3. Application structure
\`\`\`
src/
  modules/
    cases/          controller · service · repository · events · validation
    knowledge/
    assistant/
    notifications/
    analytics/
  platform/         auth · rbac · audit · config · logging
  shared/           errors · pagination · idempotency · http
  worker/           queue consumers
\`\`\`
**Rules:** controllers are thin; services hold business rules; repositories are the only code that touches SQL; modules communicate through exported interfaces and domain events — never by importing each other's repositories.

## 4. Patterns
1. **Repository pattern** for data access with explicit transactions.
2. **Command handlers** for state changes (\`CreateCase\`, \`AssignCase\`, \`ResolveCase\`), each emitting a domain event.
3. **Transactional outbox** — events are written in the same transaction as the state change and published by a worker.
4. **Idempotency keys** on every create endpoint (24 h retention).
5. **Optimistic concurrency** with \`version\` columns and \`ETag\` / \`If-Match\`.
6. **Circuit breaker + retry with jitter** for every outbound call.

## 5. Request lifecycle
1. Gateway authenticates the token and applies rate limits.
2. Controller validates input with Zod; rejects with RFC 7807 problem details.
3. Service authorises the action against RBAC and business rules.
4. Repository executes parameterised queries inside a transaction.
5. Outbox row written; response returned with correlation ID.
6. Worker publishes events to notifications and analytics.

## 6. Error handling
| Class | HTTP | Behaviour |
|---|---|---|
| Validation | 422 | Field-level errors, no retry |
| Authentication | 401 | Redirect to sign-in |
| Authorisation | 403 | Audit the denied attempt |
| Not found | 404 | No information disclosure |
| Conflict | 409 | Client refetches and retries |
| Dependency failure | 502/503 | Retry with back-off; degrade gracefully |
| Unexpected | 500 | Log with stack, alert on rate |

## 7. Configuration and secrets
Twelve-factor configuration via environment variables validated at start-up; secrets fetched from the vault at boot and rotated automatically. The service refuses to start with missing or malformed configuration.

## 8. Testing approach
- **Unit** — services and pure functions (target ≥ 80% branch coverage)
- **Integration** — repositories and API against real PostgreSQL and Redis in containers
- **Contract** — OpenAPI schema validation for every endpoint
- **End-to-end** — five critical journeys nightly
- **AI evaluation** — 200-case regression set for groundedness and escalation accuracy

## 9. Observability
Structured JSON logs with correlation IDs, RED metrics per endpoint, distributed traces, SLO dashboards and alerting on error-budget burn. PII is redacted before logging.

## 10. Performance guidelines
Pagination mandatory on lists; no N+1 queries (enforced by lint rule and query-count tests); background work for anything slower than 200 ms; connection pool sized to \`2 × cores\`.`,

    /* ──────────────────────────────────────────────────────────── */
    'API Endpoint List': `## 1. Conventions
- Base URL: \`https://api.example.com/v1\`
- Authentication: OIDC bearer token (\`Authorization: Bearer …\`)
- Content type: \`application/json\`; errors use \`application/problem+json\`
- Pagination: \`?limit=25&cursor=…\` (max 100) returning \`{ data, page: { next, hasMore } }\`
- Idempotency: \`Idempotency-Key\` header on all \`POST\` create calls
- Rate limits: 600 requests/minute per user; \`429\` with \`Retry-After\`

## 2. Cases
| Method | Path | Description | Scope |
|---|---|---|---|
| POST | /cases | Create a case | cases:write |
| GET | /cases | List cases (filters: status, priority, assignee, createdAfter) | cases:read |
| GET | /cases/{id} | Get a case with timeline | cases:read |
| PATCH | /cases/{id} | Update fields (requires \`If-Match\`) | cases:write |
| POST | /cases/{id}/replies | Add a reply (human or approved AI draft) | cases:write |
| POST | /cases/{id}/assign | Assign to a user or queue | cases:assign |
| POST | /cases/{id}/decision | Resolve, escalate or close with reason | cases:decide |
| GET | /cases/{id}/timeline | Chronological events | cases:read |

### Example — create a case
\`\`\`
POST /v1/cases
Idempotency-Key: 7c1f3d2a-…

{
  "channel": "email",
  "subject": "Charged twice for annual plan",
  "body": "I was billed on 2 and 3 October…",
  "customerId": "cus_81723",
  "priority": "high"
}
\`\`\`
\`\`\`
201 Created
{ "id": "cs_4821", "status": "open", "queue": "billing", "slaDueAt": "2026-10-08T10:00:00Z" }
\`\`\`

## 3. Knowledge
| Method | Path | Description | Scope |
|---|---|---|---|
| GET | /knowledge/search?q= | Hybrid semantic + keyword search with citations | knowledge:read |
| GET | /knowledge/articles/{id} | Get an article and its versions | knowledge:read |
| POST | /knowledge/articles | Create an article | knowledge:write |
| PUT | /knowledge/articles/{id} | Update (creates a new version) | knowledge:write |
| POST | /knowledge/articles/{id}/publish | Publish a version | knowledge:publish |

## 4. Assistant
| Method | Path | Description | Scope |
|---|---|---|---|
| POST | /assistant/drafts | Draft a reply for a case, grounded in knowledge | assistant:use |
| POST | /assistant/summaries | Summarise a case timeline | assistant:use |
| POST | /assistant/feedback | Record helpful / not helpful on a draft | assistant:use |

## 5. Notifications and preferences
| Method | Path | Description |
|---|---|---|
| GET | /customers/{id}/preferences | Read channel preferences and consent |
| PUT | /customers/{id}/preferences | Update preferences (audited) |
| POST | /webhooks/email-inbound | Inbound email → case (signed webhook) |

## 6. Analytics and administration
| Method | Path | Description |
|---|---|---|
| GET | /analytics/queues | Queue health and SLA risk |
| GET | /analytics/exports/{id} | Download a generated export |
| GET | /admin/audit | Search the audit log (admin only) |
| GET | /admin/users | List users and roles |

## 7. Error model
\`\`\`
{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Validation failed",
  "status": 422,
  "detail": "subject must not be empty",
  "instance": "/v1/cases",
  "traceId": "9f2c1b5e",
  "errors": [{ "field": "subject", "code": "required" }]
}
\`\`\`

## 8. Versioning and deprecation
Additive changes are non-breaking. Breaking changes ship as \`/v2\` with a 12-month overlap and a \`Sunset\` header on the old version.`,

    /* ──────────────────────────────────────────────────────────── */
    'Database Design Document': `## 1. Overview
PostgreSQL 16 is the system of record. Each module owns its tables; cross-module references use IDs only. All tables carry \`id\` (UUID), \`created_at\`, \`updated_at\` and \`version\` for optimistic concurrency.

## 2. Entity-relationship summary
\`\`\`
User 1───* Case *───1 Customer
Case 1───* Reply
Case 1───* Assignment *───1 User
Article 1───* ArticleVersion 1───* Chunk
Case 1───* AuditLog (via entity_id)
\`\`\`

## 3. Core tables
### user
| Column | Type | Null | Notes |
|---|---|---|---|
| id | uuid | no | PK |
| email | citext | no | unique |
| display_name | text | no | |
| role | text | no | admin / manager / agent / viewer |
| status | text | no | active / disabled |

### customer
| Column | Type | Null | Notes |
|---|---|---|---|
| id | uuid | no | PK |
| external_ref | text | yes | CRM identifier |
| email | citext | yes | encrypted at field level |
| tier | text | no | standard / gold / enterprise |
| consent_marketing | boolean | no | default false |

### case
| Column | Type | Null | Notes |
|---|---|---|---|
| id | uuid | no | PK |
| customer_id | uuid | no | FK → customer |
| channel | text | no | email / chat / portal |
| subject | text | no | |
| status | text | no | open / pending / resolved / closed |
| priority | text | no | low / normal / high / critical |
| queue | text | no | |
| sla_due_at | timestamptz | yes | |
| assignee_id | uuid | yes | FK → user |

### reply
| Column | Type | Null | Notes |
|---|---|---|---|
| id | uuid | no | PK |
| case_id | uuid | no | FK → case |
| author_id | uuid | yes | null for customer |
| body | text | no | PII-redacted copy stored separately |
| ai_drafted | boolean | no | default false |
| approved_by | uuid | yes | required when ai_drafted and sent |

### article / article_version / chunk
Articles are versioned; only one version is *published*. Chunks (≈ 400 tokens) store the text and a 1,536-dimension \`embedding\` (pgvector) for retrieval.

### audit_log
Append-only: \`id, actor_id, action, entity_type, entity_id, before jsonb, after jsonb, at, ip\`. No updates or deletes are permitted by role grants.

## 4. Indexes
| Table | Index | Purpose |
|---|---|---|
| case | (status, priority, created_at DESC) | Queue views |
| case | (assignee_id, status) | "My cases" |
| reply | (case_id, created_at) | Timeline |
| chunk | HNSW on embedding | Semantic search |
| article_version | GIN on tsvector(title, body) | Keyword search |
| audit_log | (entity_type, entity_id, at DESC) | History per record |

## 5. Data lifecycle
| Data | Retention | After expiry |
|---|---|---|
| Cases and replies | 24 months | Anonymise |
| Audit log | 7 years | Archive to cold storage |
| Marketing consent evidence | Relationship + 3 years | Delete |
| Embeddings | Follow their source article | Delete with article |

## 6. Migrations and environments
Schema changes are versioned migrations applied by CI; they must be backward-compatible for one release (expand → migrate → contract). Staging uses an anonymised copy of production.

## 7. Backup and recovery
Point-in-time recovery with 35-day retention, daily snapshots replicated to a second region. **RPO ≤ 15 minutes, RTO ≤ 1 hour**; restore tests quarterly.`,

    /* ──────────────────────────────────────────────────────────── */
    'High-Level Design Document': `## 1. Purpose
Defines the major components of **${name}**, their responsibilities and how they interact. Detail below this level is in the Low-Level Design Document.

## 2. Component catalogue
| # | Component | Responsibility | Tech | Scales |
|---|---|---|---|---|
| C1 | Web Client | Staff workspace and customer portal | Next.js | CDN + horizontal |
| C2 | API Gateway | AuthN, rate limiting, routing, request logging | Managed gateway | Managed |
| C3 | Case Service | Case lifecycle, routing, SLA clock | Node.js | Horizontal |
| C4 | Knowledge Service | Article management, embedding, retrieval | Node.js + pgvector | Horizontal |
| C5 | Assistant Service | Prompting, grounding, guardrails, evaluation | Node.js | Horizontal (rate-limited) |
| C6 | Notification Worker | Email/SMS/push, templating, retries | Node.js + BullMQ | Queue-based |
| C7 | Analytics Pipeline | Event ingestion, aggregation, exports | Batch + stream | Horizontal |
| C8 | Identity Provider | OIDC SSO and MFA | External | Managed |
| C9 | Data Stores | PostgreSQL, Redis, object storage | Managed | Managed |

## 3. Key interactions
### 3.1 Customer raises a request
1. Customer submits the portal form or sends an email.
2. Gateway authenticates (portal) or verifies the webhook signature (email).
3. Case Service creates the case, classifies intent and routes to a queue; an outbox event is written.
4. Notification Worker sends the acknowledgement.
5. Analytics receives the \`CaseCreated\` event.

### 3.2 Agent resolves with AI help
1. Agent opens the case; the timeline is loaded.
2. Agent requests a draft; Assistant calls Knowledge for the top-k passages and Case for context.
3. Assistant returns a draft with citations and a confidence score.
4. Agent edits and approves; the reply is sent and audited.

### 3.3 Manager reviews SLA risk
Analytics aggregates events every minute; the dashboard shows queues at risk and suggests re-assignment.

## 4. Cross-cutting concerns
- **Security:** token validation at the gateway, RBAC in services, field-level encryption for PII
- **Resilience:** circuit breakers, retries with jitter, bulkheads per dependency
- **Observability:** correlation IDs across all components
- **Configuration:** centrally managed feature flags per environment

## 5. Deployment topology (summary)
Stateless services run as at least two replicas across availability zones; the database is multi-AZ with automatic failover; workers scale on queue depth.

## 6. Constraints and assumptions
- Single-region launch; multi-region is a later option
- Existing CRM exposes read APIs with a rate limit of 100 requests/second *(assumption)*
- The LLM provider offers a zero-data-retention contract *(assumption)*`,

    /* ──────────────────────────────────────────────────────────── */
    'Integration Design Document': `## 1. Integration landscape
| System | Purpose | Direction | Protocol | Auth | Owner |
|---|---|---|---|---|---|
| CRM | Customer profile enrichment | Read | REST/JSON | OAuth client credentials | Sales Ops |
| Email/SMS gateway | Outbound notifications | Out | SMTP / REST | API key (vault) | IT |
| Inbound email provider | Create cases from email | In | Signed webhook | HMAC signature | IT |
| Identity provider | Single sign-on | In | OIDC | Authorization code + PKCE | Security |
| Data warehouse | Analytics and reporting | Out | Batch export | Service account | Data Team |
| LLM provider | Drafting and summarisation | Out | HTTPS | API key (vault) | Platform |

## 2. Integration patterns
- **Request/response with circuit breaker** for CRM and LLM calls
- **Webhook with signature verification and replay protection** for inbound email
- **Outbox → queue → worker** for notifications
- **Scheduled batch export** to the warehouse (hourly) with checkpointing

## 3. CRM enrichment (detail)
1. On case creation the Case Service asks the CRM adapter for the customer profile by \`external_ref\`.
2. Adapter caches the response for 10 minutes keyed by customer.
3. On 429 the adapter backs off exponentially (250 ms × 2ⁿ, jitter, max 5 tries) and returns cached or minimal data.
4. Failures never block case creation; enrichment is retried asynchronously.

## 4. Inbound email
| Step | Behaviour |
|---|---|
| Verify | Reject requests with a bad signature or a timestamp older than 5 minutes |
| Deduplicate | Use \`Message-ID\` as the idempotency key |
| Parse | Extract sender, subject, text, attachments (virus-scanned) |
| Create | Match to an existing case via reply headers, else new case |

## 5. Failure handling
| Failure | Detection | Response |
|---|---|---|
| CRM down | Timeouts / 5xx | Circuit opens; serve cached profile; alert if > 5 min |
| Notification provider error | Non-2xx | Retry up to 6 times; then dead-letter and alert |
| Webhook flood | Rate > threshold | Throttle and queue; protect the API |
| LLM unavailable | Timeouts | Return "drafting unavailable" and keep manual flow working |

## 6. Data mapping
| Source field | Target | Transform |
|---|---|---|
| crm.account.id | customer.external_ref | none |
| crm.contact.email | customer.email | lower-case, encrypt |
| crm.account.tier | customer.tier | map Silver/Gold/Platinum → standard/gold/enterprise |

## 7. Testing and monitoring
Contract tests against provider sandboxes; synthetic transactions every five minutes; dashboards for success rate, latency and queue depth per integration.`,

    /* ──────────────────────────────────────────────────────────── */
    'Infrastructure Design Document': `## 1. Hosting model
Private cloud tenant on a major provider, single region with three availability zones. Everything is described as code (Terraform) and deployed through CI/CD.

## 2. Environments
| Environment | Purpose | Data | Scale |
|---|---|---|---|
| Development | Feature work | Synthetic | Minimal, shared |
| Staging | Release candidates, performance tests | Anonymised copy | 50% of production |
| Production | Live service | Real | Full |

## 3. Topology
\`\`\`
Internet ─▶ CDN/WAF ─▶ Load balancer ─▶ [App tier: 3 AZ × 2 replicas]
                                         │
                       ┌─────────────────┼──────────────────┐
                       ▼                 ▼                  ▼
                 PostgreSQL (multi-AZ)  Redis (replica)  Object storage
                       ▲
                 Read replica ──▶ Analytics export
\`\`\`
Private subnets host application and data tiers; only the load balancer is public. Outbound traffic leaves through NAT with an allow-list.

## 4. Compute and scaling
| Workload | Platform | Min / max replicas | Scale trigger |
|---|---|---|---|
| Web + API | Container service | 6 / 24 | CPU > 60% or p95 latency > 250 ms |
| Assistant service | Container service | 2 / 12 | Request queue depth |
| Workers | Container service | 2 / 20 | Queue depth > 500 |

## 5. Data services
- PostgreSQL 16 managed, 8 vCPU / 64 GB initial, storage auto-scaling, **multi-AZ failover under 60 s**
- Redis 7 with replica and persistence for queues
- Object storage with versioning and lifecycle rules (cold after 90 days)

## 6. Resilience and disaster recovery
| Objective | Target |
|---|---|
| Availability | 99.9% monthly |
| RPO | ≤ 15 minutes |
| RTO | ≤ 1 hour |
| Backup retention | 35 days PITR, daily snapshots cross-region |
| DR test | Restore drill every quarter |

## 7. Observability
Central logging, metrics and tracing; SLO dashboards (availability, latency, error budget); paging for burn-rate alerts; cost dashboards by tag.

## 8. Delivery pipeline
1. Pull request → lint, unit tests, security scan
2. Merge → build image, integration tests, push to registry
3. Deploy to Staging automatically; smoke and performance tests
4. Manual approval → blue/green deploy to Production with automatic rollback on SLO breach

## 9. Cost guard-rails
Budgets and alerts per environment; right-sizing review monthly; AI usage capped per team with daily spend alerts.`,

    /* ──────────────────────────────────────────────────────────── */
    'Security Design Document': `## 1. Security objectives
Protect customer data (confidentiality), prevent unauthorised change (integrity), keep the service available, and produce evidence of every sensitive action (accountability).

## 2. Data classification
| Class | Examples | Controls |
|---|---|---|
| Restricted | Government IDs, payment data | Field-level encryption, strict access, no AI prompts |
| Confidential | Case content, customer email | Encryption at rest/in transit, RBAC, audit |
| Internal | Knowledge articles, configuration | RBAC |
| Public | Help centre content | None |

## 3. Identity and access
- **Authentication:** OIDC single sign-on with MFA enforced by the identity provider; access tokens 15 minutes; rotating refresh tokens 8 hours
- **Authorisation:** role-based access (admin, manager, agent, viewer) enforced in services; resource-level checks for "my cases"
- **Privileged access:** just-in-time elevation with approval and full session logging
- **Service accounts:** short-lived credentials from the vault; no shared secrets

## 4. Data protection
| Layer | Control |
|---|---|
| In transit | TLS 1.3 everywhere; HSTS; mTLS between internal services |
| At rest | AES-256 for databases and storage; customer-managed keys |
| Field level | Envelope encryption for restricted fields |
| Secrets | Managed vault; automatic rotation every 90 days |
| Logs | PII redacted before write |

## 5. Threat model (STRIDE summary)
| Threat | Example | Mitigation |
|---|---|---|
| **S**poofing | Stolen token | Short lifetimes, device checks, anomaly alerts |
| **T**ampering | Altered case history | Append-only audit, integrity hashes |
| **R**epudiation | "I did not approve that" | Signed approval events with actor and time |
| **I**nformation disclosure | Excess data in API | Field-level authorisation, response filtering |
| **D**enial of service | Request floods | WAF, rate limits, autoscaling, queue back-pressure |
| **E**levation of privilege | Role abuse | Least privilege, JIT elevation, regular access reviews |
| AI-specific | Prompt injection, data exfiltration | Input sanitisation, grounded retrieval, output filters, no tool access beyond scope |

## 6. Application security
Input validation with Zod; output encoding; parameterised queries only; dependency and container scanning in CI; SAST and DAST before each release; secrets never in code or logs.

## 7. Monitoring and response
Security events (failed logins, privilege changes, mass exports) feed the SIEM; alerts routed to the on-call security engineer; incident runbooks with 30-minute acknowledgement for critical alerts.

## 8. Compliance mapping
| Requirement | Control |
|---|---|
| GDPR Art. 5, 25, 32 | Minimisation, privacy by design, encryption, access control |
| GDPR Art. 17 | Deletion workflow completed within 30 days |
| ISO 27001 A.5–A.8 | Policies, access control, cryptography, operations security |
| SOC 2 CC6–CC8 | Logical access, change management, monitoring |

## 9. Open items
- Penetration test scheduled before production launch
- Confirm data-residency rules for the LLM provider *(assumption)*`,

    /* ──────────────────────────────────────────────────────────── */
    'Low-Level Design Document': `## 1. Scope
Module-level design for the **Case Service** and **Assistant Service** — the two modules with the most complex behaviour. Other modules follow the same structure.

## 2. Case Service
### 2.1 Class structure
\`\`\`
CaseController
  └─ CaseHandler (commands)
       ├─ CaseRepository   (SQL, transactions)
       ├─ RoutingPolicy    (intent → queue)
       ├─ SlaCalculator    (priority, tier → due time)
       └─ OutboxWriter     (domain events)
\`\`\`

### 2.2 State machine
| From | Event | To | Guard |
|---|---|---|---|
| open | assign | pending | assignee exists |
| pending | reply_sent | pending | author has permission |
| pending | resolve | resolved | resolution reason present |
| resolved | reopen | open | within 14 days |
| resolved | close | closed | automatic after 14 days |

### 2.3 Create-case sequence
1. Validate payload (Zod) and idempotency key.
2. Begin transaction; insert \`case\`; insert \`audit_log\`; insert \`outbox\`.
3. Commit; return 201 with SLA due time.
4. Worker publishes \`CaseCreated\` and triggers enrichment asynchronously.

### 2.4 SLA calculation
\`due = created_at + base(priority) × tierFactor\` excluding non-business hours; base: critical 1 h, high 4 h, normal 1 day, low 3 days; tierFactor: enterprise 0.5, gold 0.75, standard 1.

## 3. Assistant Service
### 3.1 Drafting pipeline
1. **Collect context** — case summary, last five replies, customer tier (PII redacted)
2. **Retrieve** — top 8 chunks via hybrid search; filter by published, current version
3. **Rank** — rerank to top 4; drop chunks below the similarity threshold (0.72)
4. **Prompt** — system rules + context + passages + task; citations required
5. **Generate** — model call with 20 s timeout and one retry
6. **Guardrails** — check citations exist, no promised refunds, no PII echo, tone check
7. **Return** — draft, citations, confidence, guardrail results

### 3.2 Guardrail rules
| Rule | Action on failure |
|---|---|
| Every factual sentence cites a passage | Regenerate once, else return "insufficient knowledge" |
| No refund / legal commitment | Replace with escalation sentence |
| PII detected in output | Redact and flag |
| Confidence < 0.6 | Mark "needs human research" |

## 4. Error handling and logging
Each public method returns a typed \`Result<T, DomainError>\`; unexpected exceptions are caught at the boundary, logged with the correlation ID and mapped to RFC 7807 responses.

## 5. Concurrency
Optimistic locking on \`case.version\`; the client receives \`409\` with the latest representation. Queue consumers are idempotent using event IDs stored for 7 days.

## 6. Unit-test outline
- RoutingPolicy: table-driven tests for each intent × tier
- SlaCalculator: business-hour boundaries, weekends, time zones
- Guardrails: golden files for accepted and rejected drafts`,

    /* ──────────────────────────────────────────────────────────── */
    'AI Solution Design Document': `## 1. Purpose and principles
Defines how AI is used in **${name}**: where it helps, how it is grounded, what it may not do, how quality is measured and how people stay in control.

**Principles:** *assist, don't replace* · *ground every answer* · *humans decide* · *measure continuously* · *protect data*

## 2. Use cases
| ID | Use case | Value | Autonomy level |
|---|---|---|---|
| AI-1 | Draft replies from case + knowledge | −30% handling time | Human approves before sending |
| AI-2 | Summarise long case timelines | Faster hand-offs | Read-only suggestion |
| AI-3 | Classify intent and urgency | Better routing | Auto-routes; reversible, low risk |
| AI-4 | Suggest knowledge improvements | Higher answer quality | Suggestion to content owner |

## 3. Architecture
\`\`\`
 Case context ─┐
               ├─▶ Redaction ─▶ Retrieval (hybrid) ─▶ Prompt builder ─▶ LLM gateway ─▶ Guardrails ─▶ Human review
 Knowledge  ───┘                                                                                    │
                                                                                         Feedback ◀─┘
\`\`\`

## 4. Grounding and retrieval
- Source of truth: **published** knowledge articles only
- Chunking ≈ 400 tokens with 50-token overlap; metadata keeps article, version and owner
- Hybrid retrieval (vector + keyword) with reranking; similarity threshold 0.72
- Every claim in a draft must carry a citation; no citation → no claim

## 5. Model usage
| Task | Model class | Max tokens | Temperature |
|---|---|---|---|
| Drafting | Large general model | 700 | 0.2 |
| Summarising | Medium model | 400 | 0.1 |
| Classification | Small model | 50 | 0 |
Models are selected per task behind a gateway so providers can be swapped and costs capped.

## 6. Guardrails
- Input: redact PII, strip prompt-injection patterns, limit input size
- Output: citations required, policy checks (refunds, legal, secrets), tone check
- Operational: per-team daily token budgets, kill switch per use case

## 7. Evaluation
| Metric | Target | Method |
|---|---|---|
| Groundedness | ≥ 95% of claims supported | Automated check + weekly human sample |
| Helpfulness | ≥ 80% accepted with light edits | Agent feedback |
| Escalation accuracy | ≥ 90% | Labelled set of 200 cases |
| Harmful output | 0 tolerated | Red-team prompts before each release |
Regression suite runs on every prompt or model change; releases are blocked on regressions.

## 8. Human oversight
AI provides recommendations. **Final decisions are always made by people.** Agents see citations and confidence; low-confidence drafts are labelled; all AI-assisted replies are tagged \`ai_drafted\` in the audit log.

## 9. Risks and mitigations
| Risk | Mitigation |
|---|---|
| Hallucination | Grounding, citations, guardrails, human approval |
| Bias in tone or outcomes | Test sets across customer segments; periodic review |
| Over-reliance | Training; sampling of approved drafts for quality |
| Data leakage | Redaction, zero-retention provider terms, access controls |
| Cost overrun | Budgets, caching, small models for simple tasks |

## 10. Responsible-AI checklist
- [x] Purpose and users documented
- [x] Human-in-the-loop defined for each use case
- [x] Data protection impact assessment initiated
- [ ] Independent evaluation before general availability`,
  };
  return header(type, name, abbrOf[type]) + bodies[type];
};

const abbrOf: Record<DocType, string> = {
  'Solution Architecture Document': 'SAD', 'Technical Design Document': 'TDD', 'API Endpoint List': 'API', 'Database Design Document': 'DDD', 'High-Level Design Document': 'HLD',
  'Integration Design Document': 'IDD', 'Infrastructure Design Document': 'INDD', 'Security Design Document': 'SDD', 'Low-Level Design Document': 'LLD', 'AI Solution Design Document': 'AISDD',
};

# CDO — Chief Data Officer Skill

## Responsibility
Validate data models, entity relationships, data pipeline readiness, data governance, and data consistency.

## Validation Criteria
1. Relational and document data schemas reflect all business entities (claims, receipts, audits, line items).
2. Data lineage and auditing guarantees are enforced for all transaction changes.
3. Master data management and deduplication strategies are established.
4. Database indexing and query performance support reporting and analytical requirements.

## Allowed Decisions
- VALIDATED: Data architecture is consistent, normalized where appropriate, and governance rules are defined.
- NEEDS_CHANGES: Missing entity relationship models, inadequate audit logging schemas, or data inconsistency risks.

## Required Evidence
- Entity-relationship diagrams or schema specs.
- Audit trail and data retention policies.

## Blocking Conditions
- Missing entity definitions for core business objects.
- Inability to trace transaction state transitions in the data layer.

## Report Format
Structured data architecture report detailing Schema Completeness, Lineage, Governance, and Decision.

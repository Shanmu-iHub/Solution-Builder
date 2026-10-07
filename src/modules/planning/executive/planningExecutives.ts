import { CSuiteMemberReview, CSuiteRole, CSUITE_ROLES_META } from './csuiteData';
import { PlanningStageId } from '../map/planningMap';

/* C-Suite reviews for the Solution Planning stages. Each stage is reviewed by the executives
 * whose area it touches. Scores and findings are demo data. */

type Row = [CSuiteRole, number, 'Validated' | 'Pending', 'Low' | 'Medium' | 'High', string, string, [string, string, string]];

const make = (rows: Row[]): CSuiteMemberReview[] =>
  rows.map(([role, score, status, risk, reviewed, findings, criteria]) => ({ role, title: CSUITE_ROLES_META[role].title, score, status, risk, reviewed, findings, criteria }));

export const INITIAL_PLANNING_EXEC: Record<PlanningStageId, CSuiteMemberReview[]> = {
  solution_dashboard: make([
    ['CEO', 92, 'Validated', 'Low', 'Strategic fit of the recommended solution and executive sponsorship.', 'The recommended solution maps directly to the validated problem and the expense-automation mandate.', ['Strategic alignment', 'Sponsorship readiness', 'Outcome clarity']],
    ['CPO', 90, 'Validated', 'Low', 'Problem-to-capability mapping and product scope.', 'Every business problem has a matching solution capability; the module list is coherent.', ['Capability coverage', 'Scope discipline', 'User value']],
    ['CFO', 86, 'Pending', 'Medium', 'Business case, expected outcomes and investment envelope.', 'Outcome targets are plausible but cost assumptions are still estimates and need finance sign-off.', ['ROI plausibility', 'Cost assumptions', 'Budget fit']],
    ['CTO', 88, 'Validated', 'Low', 'Technical viability of the proposed modules and AI features.', 'Modules rely on proven components; the finance-system connector is the main unknown.', ['Stack viability', 'Integration risk', 'AI maturity']],
  ]),
  documentation: make([
    ['CTO', 90, 'Validated', 'Low', 'Architecture, technical design and API documents.', 'Documents are consistent with the approved solution and specific enough to build from.', ['Design consistency', 'API completeness', 'Traceability']],
    ['CIO', 87, 'Validated', 'Low', 'Infrastructure and integration design documents.', 'Hosting and integration approach fits the enterprise landscape; environments are defined.', ['Infrastructure fit', 'Integration clarity', 'Operability']],
    ['CDO', 84, 'Pending', 'Medium', 'Database design and data flow documentation.', 'Entities are defined but retention and data-quality rules need to be written down.', ['Data model quality', 'Retention rules', 'Lineage']],
    ['CISO', 82, 'Pending', 'Medium', 'Security design document and threat considerations.', 'Authentication and encryption are covered; incident response and key rotation are missing.', ['Access control', 'Encryption', 'Incident response']],
  ]),
  architecture_validation: make([
    ['CTO', 91, 'Validated', 'Low', 'End-to-end architecture against approved requirements.', 'No critical conflicts found; scaling and failure modes are addressed.', ['Requirement coverage', 'Scalability', 'Resilience']],
    ['CISO', 85, 'Validated', 'Medium', 'Security findings from the validation run.', 'No critical findings; two medium findings need a fix before build.', ['Open findings', 'Threat coverage', 'Remediation plan']],
    ['CDO', 88, 'Validated', 'Low', 'Data architecture and integrity checks.', 'Data model supports the requirements without structural gaps.', ['Integrity', 'Ownership', 'Storage fit']],
    ['CIO', 86, 'Validated', 'Low', 'Deployment readiness and environment plan.', 'Pipelines and environments are defined; no blocking dependencies.', ['Environment readiness', 'CI/CD', 'Monitoring']],
    ['CCO', 80, 'Pending', 'Medium', 'Regulatory and policy compliance of the design.', 'Receipt retention and audit trail rules need explicit controls before sign-off.', ['Policy mapping', 'Audit trail', 'Retention']],
  ]),
  ux_foundation: make([
    ['CPO', 92, 'Validated', 'Low', 'Personas, journeys and the opportunities they expose.', 'Personas are grounded in the research; journeys point to clear product opportunities.', ['Persona quality', 'Journey coverage', 'Insight to feature']],
    ['CMO', 86, 'Validated', 'Low', 'Customer experience and adoption factors.', 'Experience goals support adoption; onboarding for field teams should be tested early.', ['Adoption', 'Brand fit', 'Onboarding']],
    ['COO', 84, 'Pending', 'Medium', 'Operational fit of the journeys for managers and finance.', 'Manager approval flow is clear; finance exception handling needs more detail.', ['Process fit', 'Exception handling', 'Workload impact']],
  ]),
  wireframe_generation: make([
    ['CPO', 90, 'Validated', 'Low', 'Screens, flows and interactions against the journeys.', 'Key journeys are covered end to end; interactions are specified per page.', ['Flow completeness', 'Consistency', 'Interaction clarity']],
    ['CTO', 85, 'Validated', 'Low', 'Feasibility of the proposed interactions and components.', 'All screens can be built with the planned component set; offline capture needs a spike.', ['Buildability', 'Component reuse', 'Offline support']],
    ['CMO', 88, 'Pending', 'Low', 'Usability and clarity for end users.', 'Layouts are clear; copy and empty states still need a pass.', ['Clarity', 'Accessibility', 'Content']],
  ]),
  task_breakdown: make([
    ['COO', 89, 'Validated', 'Low', 'Delivery plan, sequencing and capacity.', 'Epics are sequenced sensibly with a clear first release.', ['Sequencing', 'Capacity', 'Dependencies']],
    ['CFO', 84, 'Pending', 'Medium', 'Effort estimates and cost to deliver.', 'Hours roll up to a plausible budget; contingency is not yet stated.', ['Estimate quality', 'Contingency', 'Budget fit']],
    ['CTO', 87, 'Validated', 'Low', 'Technical task breakdown and ownership.', 'Tasks are small enough to estimate and map to the architecture.', ['Granularity', 'Ownership', 'Technical risk']],
    ['CPO', 91, 'Validated', 'Low', 'Traceability from epics to requirements.', 'Every epic traces back to an approved requirement.', ['Traceability', 'Priority', 'Release scope']],
  ]),
};

export const avgScore = (reviews: CSuiteMemberReview[]) => Math.round(reviews.reduce((s, r) => s + r.score, 0) / (reviews.length || 1));

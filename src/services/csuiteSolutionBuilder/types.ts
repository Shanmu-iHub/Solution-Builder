export type SolutionActivityId =
  | 'skill-gathering'
  | 'architect'
  | 'endpoint-workflow'
  | 'dependency-mapper'
  | 'db-credentials'
  | 'data-seeding'
  | 'code-generation'
  | 'code-validator'
  | 'build-preview'
  | 'final-stage-gate';

export type CSuiteMemberId = 'CEO' | 'CPO' | 'CTO' | 'CDO' | 'CISO' | 'CIO';

export type ActivityValidationStatus =
  | 'Pending'
  | 'In Review'
  | 'Validated'
  | 'Changes Required';

export interface CSuiteMemberReview {
  memberId: CSuiteMemberId;
  memberName: string;
  role: string;
  status: 'Validated' | 'Changes Required' | 'In Review' | 'Pending';
  validationArea: string;
  reviewMessage: string;
  requiredAction?: string;
  timestamp?: string;
}

export interface SolutionActivityConfig {
  id: SolutionActivityId;
  number: number;
  title: string;
  description: string;
  requiredMembers: CSuiteMemberId[];
  validationPerspectives: string[];
  defaultStatus: ActivityValidationStatus;
  reviews: Record<CSuiteMemberId, CSuiteMemberReview>;
}

export const C_SUITE_MEMBER_NAMES: Record<CSuiteMemberId, { name: string; title: string }> = {
  CEO: { name: 'Chief Executive Officer', title: 'Final stage validation & progression approval' },
  CPO: { name: 'Chief Product Officer', title: 'Product capabilities & user value' },
  CTO: { name: 'Chief Technology Officer', title: 'Technical architecture, APIs & code quality' },
  CDO: { name: 'Chief Data Officer', title: 'Data architecture, schema & integrity' },
  CISO: { name: 'Chief Information Security Officer', title: 'Security architecture, credentials & compliance' },
  CIO: { name: 'Chief Information Officer', title: 'Deployment, infrastructure & operational readiness' }
};

export const SOLUTION_ACTIVITIES_MAPPING: Record<SolutionActivityId, SolutionActivityConfig> = {
  'skill-gathering': {
    id: 'skill-gathering',
    number: 1,
    title: 'Skill Gathering',
    description: 'Assemble domain skills, LLM prompts, and technical toolsets required for solution building.',
    requiredMembers: ['CPO', 'CTO'],
    validationPerspectives: ['Product capabilities', 'Technical skills/capabilities'],
    defaultStatus: 'Validated',
    reviews: {
      CPO: {
        memberId: 'CPO',
        memberName: 'Chief Product Officer',
        role: 'Product capabilities',
        status: 'Validated',
        validationArea: 'Product Capabilities',
        reviewMessage: 'Required user skills and interactive capabilities align with confirmed product requirements.',
        requiredAction: 'None. Approved to proceed.'
      },
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Technical skills/capabilities',
        status: 'Validated',
        validationArea: 'Technical Skills & Capabilities',
        reviewMessage: 'Technical agent capabilities, vector memory toolsets, and system skills are verified.',
        requiredAction: 'None. Approved to proceed.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CDO: { memberId: 'CDO', memberName: 'CDO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CISO: { memberId: 'CISO', memberName: 'CISO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  architect: {
    id: 'architect',
    number: 2,
    title: 'Architect',
    description: 'Design system architecture, data models, integration boundaries, and security perimeters.',
    requiredMembers: ['CTO', 'CDO', 'CISO'],
    validationPerspectives: ['Technical architecture', 'Data architecture', 'Security architecture'],
    defaultStatus: 'Validated',
    reviews: {
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Technical architecture',
        status: 'Validated',
        validationArea: 'Technical Architecture',
        reviewMessage: 'Microservices boundaries, API contracts, and stateless execution workers meet architectural guidelines.',
        requiredAction: 'None. Technical architecture approved.'
      },
      CDO: {
        memberId: 'CDO',
        memberName: 'Chief Data Officer',
        role: 'Data architecture',
        status: 'Validated',
        validationArea: 'Data Architecture',
        reviewMessage: 'Data stores, entity relations, and isolation levels satisfy transactional persistence requirements.',
        requiredAction: 'None. Data architecture approved.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Security architecture',
        status: 'Validated',
        validationArea: 'Security Architecture',
        reviewMessage: 'Zero-trust network perimeters, TLS 1.3 encryption, and secret isolation adhere to enterprise security policies.',
        requiredAction: 'None. Security architecture approved.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'endpoint-workflow': {
    id: 'endpoint-workflow',
    number: 3,
    title: 'Endpoint / Workflow',
    description: 'Configure REST/GraphQL routes, request validators, and orchestration workflow sequences.',
    requiredMembers: ['CTO'],
    validationPerspectives: ['APIs', 'Endpoints', 'Workflow', 'System integration'],
    defaultStatus: 'Validated',
    reviews: {
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'APIs, Endpoints, Workflow & System integration',
        status: 'Validated',
        validationArea: 'API Endpoints & Workflow Routing',
        reviewMessage: 'All 10 backend routes and workflow dispatch handlers adhere to RESTful standards and error-handling specs.',
        requiredAction: 'None. APIs and endpoints approved.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CDO: { memberId: 'CDO', memberName: 'CDO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CISO: { memberId: 'CISO', memberName: 'CISO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'dependency-mapper': {
    id: 'dependency-mapper',
    number: 4,
    title: 'Dependency Mapper',
    description: 'Map third-party NPM libraries, cloud SDKs, database drivers, and service dependencies.',
    requiredMembers: ['CTO', 'CDO', 'CISO'],
    validationPerspectives: ['Technical dependencies', 'Data dependencies', 'Security dependencies'],
    defaultStatus: 'Validated',
    reviews: {
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Technical dependencies',
        status: 'Validated',
        validationArea: 'Technical Dependencies',
        reviewMessage: 'Package dependencies are pinned to stable releases with zero peer dependency conflicts.',
        requiredAction: 'None. Dependencies approved.'
      },
      CDO: {
        memberId: 'CDO',
        memberName: 'Chief Data Officer',
        role: 'Data dependencies',
        status: 'Validated',
        validationArea: 'Data Dependencies & Drivers',
        reviewMessage: 'Database connection pool drivers (PostgreSQL / Redis) match throughput expectations.',
        requiredAction: 'None. Data dependencies approved.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Security dependencies',
        status: 'Validated',
        validationArea: 'Security Vulnerability Audit',
        reviewMessage: 'Zero known CVE vulnerabilities found in package dependency tree.',
        requiredAction: 'None. Clean security audit.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'db-credentials': {
    id: 'db-credentials',
    number: 5,
    title: 'DB Agent / Credentials',
    description: 'Provision database instances, configure connection strings, and establish RBAC access roles.',
    requiredMembers: ['CDO', 'CISO'],
    validationPerspectives: ['Database requirements', 'Database access', 'Credential/security controls'],
    defaultStatus: 'Validated',
    reviews: {
      CDO: {
        memberId: 'CDO',
        memberName: 'Chief Data Officer',
        role: 'Database requirements',
        status: 'Validated',
        validationArea: 'Database Access & Provisioning',
        reviewMessage: 'Database connection credentials and connection pooling limits are correctly allocated.',
        requiredAction: 'None. DB requirements verified.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Credential/security controls',
        status: 'Validated',
        validationArea: 'Credential Vault Security',
        reviewMessage: 'Database passwords stored in encrypted environment vault with IAM role rotation.',
        requiredAction: 'None. Credential controls approved.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CTO: { memberId: 'CTO', memberName: 'CTO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'data-seeding': {
    id: 'data-seeding',
    number: 6,
    title: 'Data Seeding / Schema',
    description: 'Execute database schema DDL migrations, compile relational tables, and inject seed baseline data.',
    requiredMembers: ['CDO'],
    validationPerspectives: ['Database schema', 'Data model', 'Data integrity'],
    defaultStatus: 'Validated',
    reviews: {
      CDO: {
        memberId: 'CDO',
        memberName: 'Chief Data Officer',
        role: 'Database schema, Data model & Data integrity',
        status: 'Validated',
        validationArea: 'Database Schema & Data Model',
        reviewMessage: 'Foreign key constraints, indexes, and seeded ticket records pass all referential integrity checks.',
        requiredAction: 'None. Schema verified.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CTO: { memberId: 'CTO', memberName: 'CTO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CISO: { memberId: 'CISO', memberName: 'CISO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'code-generation': {
    id: 'code-generation',
    number: 7,
    title: 'Code Generation',
    description: 'Synthesize full-stack frontend React components, backend API controllers, and database services.',
    requiredMembers: ['CTO', 'CISO'],
    validationPerspectives: ['Technical implementation', 'Secure coding'],
    defaultStatus: 'Validated',
    reviews: {
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Technical implementation',
        status: 'Validated',
        validationArea: 'Technical Code Generation',
        reviewMessage: 'Generated code exhibits clean separation of concerns, strong TypeScript types, and zero syntax errors.',
        requiredAction: 'None. Implementation approved.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Secure coding',
        status: 'Validated',
        validationArea: 'Secure Coding Standards',
        reviewMessage: 'Parameterized queries prevent SQL injection; input validation guards protect all external endpoints.',
        requiredAction: 'None. Secure coding approved.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CDO: { memberId: 'CDO', memberName: 'CDO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'code-validator': {
    id: 'code-validator',
    number: 8,
    title: 'Code Validator',
    description: 'Run automated static code analysis, type checkers, linter rules, and security scans.',
    requiredMembers: ['CTO', 'CDO', 'CISO'],
    validationPerspectives: ['Code quality', 'Data handling', 'Security'],
    defaultStatus: 'Validated',
    reviews: {
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Code quality',
        status: 'Validated',
        validationArea: 'Code Quality & Linting',
        reviewMessage: 'Unit test suites and TypeScript compiler pass with 100% strict type safety.',
        requiredAction: 'None. Code quality validated.'
      },
      CDO: {
        memberId: 'CDO',
        memberName: 'Chief Data Officer',
        role: 'Data handling',
        status: 'Validated',
        validationArea: 'Data Handling & Sanitization',
        reviewMessage: 'Data mutations follow ACID transactional boundaries without leakage.',
        requiredAction: 'None. Data handling validated.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Security',
        status: 'Validated',
        validationArea: 'Static Application Security Testing (SAST)',
        reviewMessage: 'Zero OWASP Top 10 vulnerabilities detected during static code analysis.',
        requiredAction: 'None. Security validated.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'build-preview': {
    id: 'build-preview',
    number: 9,
    title: 'Build / Preview',
    description: 'Compile production bundle, boot development sandbox, and verify live interactive preview.',
    requiredMembers: ['CPO', 'CTO', 'CIO', 'CISO'],
    validationPerspectives: ['Product behavior', 'Technical integration', 'Deployment/readiness', 'Security'],
    defaultStatus: 'Validated',
    reviews: {
      CPO: {
        memberId: 'CPO',
        memberName: 'Chief Product Officer',
        role: 'Product behavior',
        status: 'Validated',
        validationArea: 'Live Product Behavior & UX',
        reviewMessage: 'UI rendering, responsive layout, and interactive ticket flows behave exactly as specified.',
        requiredAction: 'None. Product behavior validated.'
      },
      CTO: {
        memberId: 'CTO',
        memberName: 'Chief Technology Officer',
        role: 'Technical integration',
        status: 'Validated',
        validationArea: 'Runtime Technical Integration',
        reviewMessage: 'Frontend client, backend API routes, and database communicate with sub-40ms latency.',
        requiredAction: 'None. Integration validated.'
      },
      CIO: {
        memberId: 'CIO',
        memberName: 'Chief Information Officer',
        role: 'Deployment/readiness',
        status: 'Validated',
        validationArea: 'Deployment & Operational Readiness',
        reviewMessage: 'Container build time < 25s, health check endpoints return HTTP 200, ready for staging rollout.',
        requiredAction: 'None. Operational readiness validated.'
      },
      CISO: {
        memberId: 'CISO',
        memberName: 'Chief Information Security Officer',
        role: 'Security',
        status: 'Validated',
        validationArea: 'Runtime Security Perimeter',
        reviewMessage: 'CORS headers, CSRF protections, and CSP policies configured properly on the preview host.',
        requiredAction: 'None. Runtime security validated.'
      },
      CEO: { memberId: 'CEO', memberName: 'CEO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' },
      CDO: { memberId: 'CDO', memberName: 'CDO', role: '', status: 'Validated', validationArea: '', reviewMessage: '' }
    }
  },
  'final-stage-gate': {
    id: 'final-stage-gate',
    number: 10,
    title: 'Final Stage Gate',
    description: 'Executive leadership sign-off across all required C-Suite perspectives to authorize progression.',
    requiredMembers: ['CEO', 'CPO', 'CTO', 'CDO', 'CISO', 'CIO'],
    validationPerspectives: ['Final stage validation', 'Confirm all required validations passed', 'Approve progression'],
    defaultStatus: 'Validated',
    reviews: {
      CEO: {
        memberId: 'CEO',
        memberName: 'Chief Executive Officer',
        role: 'Final stage validation & progression approval',
        status: 'Validated',
        validationArea: 'Executive Stage Sign-Off',
        reviewMessage: 'All required C-Suite domain validations have completed successfully with zero blocking issues. Progression approved.',
        requiredAction: 'None. Stage approved.'
      },
      CPO: { memberId: 'CPO', memberName: 'CPO', role: 'Product', status: 'Validated', validationArea: 'Product Sign-Off', reviewMessage: 'Product scope satisfied.', requiredAction: 'None.' },
      CTO: { memberId: 'CTO', memberName: 'CTO', role: 'Technical', status: 'Validated', validationArea: 'Technical Sign-Off', reviewMessage: 'Engineering specs verified.', requiredAction: 'None.' },
      CDO: { memberId: 'CDO', memberName: 'CDO', role: 'Data', status: 'Validated', validationArea: 'Data Sign-Off', reviewMessage: 'Data architecture verified.', requiredAction: 'None.' },
      CISO: { memberId: 'CISO', memberName: 'CISO', role: 'Security', status: 'Validated', validationArea: 'Security Sign-Off', reviewMessage: 'Zero security findings.', requiredAction: 'None.' },
      CIO: { memberId: 'CIO', memberName: 'CIO', role: 'Operations', status: 'Validated', validationArea: 'Delivery Sign-Off', reviewMessage: 'Infrastructure ready.', requiredAction: 'None.' }
    }
  }
};

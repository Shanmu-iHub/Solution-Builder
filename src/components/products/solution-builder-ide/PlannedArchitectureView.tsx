import React, { useState } from 'react';
import {
  Copy,
  Download,
  X,
  ChevronDown,
  ChevronRight,
  Layers,
  FileCode,
  Globe,
  Database,
  Cpu,
  ShieldCheck,
  Workflow,
  CheckCircle2,
  Box,
  Share2
} from 'lucide-react';

interface ModuleCategory {
  id: string;
  name: string;
  count: number;
  colorClass: string;
  badgeBg: string;
  icon: React.ReactNode;
  items: Array<{
    name: string;
    path: string;
    description: string;
    status: 'Ready' | 'Generated';
  }>;
}

export const PlannedArchitectureView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'modules' | 'tree' | 'graph' | 'flowchart'>('modules');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    pages: true,
    components: true,
    routes: false,
    controllers: false,
    services: false,
    models: false,
    validations: false,
    workflows: false
  });

  const categories: ModuleCategory[] = [
    {
      id: 'pages',
      name: 'Pages',
      count: 7,
      colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
      badgeBg: 'bg-blue-100 text-blue-800',
      icon: <Layers className="w-4 h-4 text-blue-600" />,
      items: [
        { name: 'TicketBoardPage', path: '/src/pages/TicketBoardPage.tsx', description: 'Single-screen workspace Kanban board for tickets', status: 'Ready' },
        { name: 'TicketDetailsModal', path: '/src/pages/TicketDetailsModal.tsx', description: 'Detail inspection view with history, comments & status transition', status: 'Ready' },
        { name: 'AnalyticsDashboardPage', path: '/src/pages/AnalyticsPage.tsx', description: 'Summary KPI metric cards and queue throughput charts', status: 'Ready' },
        { name: 'AgentQueuePage', path: '/src/pages/AgentQueuePage.tsx', description: 'Workload distribution and assignee balancing interface', status: 'Ready' },
        { name: 'SettingsPage', path: '/src/pages/SettingsPage.tsx', description: 'Workspace configuration and SLA escalation rules', status: 'Ready' },
        { name: 'AuditLogPage', path: '/src/pages/AuditLogPage.tsx', description: 'Immutable activity timeline and modification logs', status: 'Ready' },
        { name: 'NotFoundPage', path: '/src/pages/NotFoundPage.tsx', description: 'Fallback error route with quick navigation shortcuts', status: 'Ready' }
      ]
    },
    {
      id: 'components',
      name: 'Components',
      count: 8,
      colorClass: 'text-purple-600 bg-purple-50 border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-800',
      icon: <Box className="w-4 h-4 text-purple-600" />,
      items: [
        { name: 'KanbanColumn', path: '/src/components/KanbanColumn.tsx', description: 'Drag-and-drop container column (Open, In Progress, Resolved)', status: 'Ready' },
        { name: 'TicketCard', path: '/src/components/TicketCard.tsx', description: 'Interactive ticket card with priority badge, assignee avatar & tags', status: 'Ready' },
        { name: 'TicketFilterBar', path: '/src/components/TicketFilterBar.tsx', description: 'Instant multi-attribute search and facet filter controls', status: 'Ready' },
        { name: 'CreateTicketDrawer', path: '/src/components/CreateTicketDrawer.tsx', description: 'Reactive form for logging customer issues with validation', status: 'Ready' },
        { name: 'PriorityBadge', path: '/src/components/PriorityBadge.tsx', description: 'Visual urgency indicator (Low, Medium, High, Urgent)', status: 'Ready' },
        { name: 'AgentAvatarGroup', path: '/src/components/AgentAvatarGroup.tsx', description: 'Team assignee stack with online presence indicator', status: 'Ready' },
        { name: 'MetricSummaryBar', path: '/src/components/MetricSummaryBar.tsx', description: 'Total, resolved, and SLA breach counters', status: 'Ready' },
        { name: 'ActivityFeed', path: '/src/components/ActivityFeed.tsx', description: 'Real-time audit log stream for ticket lifecycle events', status: 'Ready' }
      ]
    },
    {
      id: 'routes',
      name: 'Backend API Routes',
      count: 10,
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      icon: <Globe className="w-4 h-4 text-emerald-600" />,
      items: [
        { name: 'GET /api/v1/tickets', path: '/api/routes/tickets.get.ts', description: 'Paginated ticket retrieval with faceted query filters', status: 'Ready' },
        { name: 'POST /api/v1/tickets', path: '/api/routes/tickets.post.ts', description: 'Create ticket with schema validation and dispatch hook', status: 'Ready' },
        { name: 'PATCH /api/v1/tickets/:id', path: '/api/routes/tickets.patch.ts', description: 'Status updates and optimistic concurrency control', status: 'Ready' },
        { name: 'DELETE /api/v1/tickets/:id', path: '/api/routes/tickets.delete.ts', description: 'Soft deletion with audit trail logging', status: 'Ready' },
        { name: 'POST /api/v1/tickets/:id/assign', path: '/api/routes/assign.post.ts', description: 'Assign support agent and notify recipient', status: 'Ready' },
        { name: 'GET /api/v1/analytics/metrics', path: '/api/routes/metrics.get.ts', description: 'Computed resolution time and MTTR aggregations', status: 'Ready' },
        { name: 'GET /api/v1/agents', path: '/api/routes/agents.get.ts', description: 'Support agent rosters and active queue depths', status: 'Ready' },
        { name: 'POST /api/v1/auth/login', path: '/api/routes/auth.login.ts', description: 'Enterprise session generation and JWT issuance', status: 'Ready' },
        { name: 'GET /api/v1/health', path: '/api/routes/health.get.ts', description: 'Container liveness and DB connectivity check', status: 'Ready' },
        { name: 'POST /api/v1/webhooks/slack', path: '/api/routes/webhook.slack.ts', description: 'Outbound webhook notification dispatch', status: 'Ready' }
      ]
    },
    {
      id: 'controllers',
      name: 'Controllers',
      count: 8,
      colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-800',
      icon: <Cpu className="w-4 h-4 text-amber-600" />,
      items: [
        { name: 'TicketController', path: '/controllers/TicketController.ts', description: 'Handles CRUD lifecycle and state machine validations', status: 'Ready' },
        { name: 'AssignmentController', path: '/controllers/AssignmentController.ts', description: 'Smart agent allocation algorithm and queue balancing', status: 'Ready' },
        { name: 'AnalyticsController', path: '/controllers/AnalyticsController.ts', description: 'Aggregation pipeline for SLA and throughput metrics', status: 'Ready' },
        { name: 'AuditController', path: '/controllers/AuditController.ts', description: 'Event sourcing recorder for compliance logs', status: 'Ready' },
        { name: 'NotificationController', path: '/controllers/NotificationController.ts', description: 'Dispatches WebSocket and email push alerts', status: 'Ready' },
        { name: 'AuthController', path: '/controllers/AuthController.ts', description: 'RBAC verification and token verification middleware', status: 'Ready' },
        { name: 'ExportController', path: '/controllers/ExportController.ts', description: 'Generates CSV and PDF compliance reports', status: 'Ready' },
        { name: 'HealthController', path: '/controllers/HealthController.ts', description: 'Subsystem latency probe and telemetry exporter', status: 'Ready' }
      ]
    },
    {
      id: 'services',
      name: 'Services',
      count: 8,
      colorClass: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      badgeBg: 'bg-cyan-100 text-cyan-800',
      icon: <Workflow className="w-4 h-4 text-cyan-600" />,
      items: [
        { name: 'TicketPersistenceService', path: '/services/TicketPersistenceService.ts', description: 'PostgreSQL repository queries with indexing support', status: 'Ready' },
        { name: 'RealtimeSyncService', path: '/services/RealtimeSyncService.ts', description: 'WebSocket room broadcasts for board changes', status: 'Ready' },
        { name: 'SLACalculatorService', path: '/services/SLACalculatorService.ts', description: 'Calculates breach timelines and escalation triggers', status: 'Ready' },
        { name: 'SearchIndexService', path: '/services/SearchIndexService.ts', description: 'Full-text query analyzer across ticket bodies', status: 'Ready' },
        { name: 'AgentRosterService', path: '/services/AgentRosterService.ts', description: 'Active agent status and capacity scheduler', status: 'Ready' },
        { name: 'EncryptionService', path: '/services/EncryptionService.ts', description: 'PII field encryption and token signing', status: 'Ready' },
        { name: 'AuditSinkService', path: '/services/AuditSinkService.ts', description: 'Asynchronous event writer for compliance auditing', status: 'Ready' },
        { name: 'EmailDispatchService', path: '/services/EmailDispatchService.ts', description: 'Customer response transaction mailer', status: 'Ready' }
      ]
    },
    {
      id: 'models',
      name: 'Data Models',
      count: 6,
      colorClass: 'text-rose-600 bg-rose-50 border-rose-200',
      badgeBg: 'bg-rose-100 text-rose-800',
      icon: <Database className="w-4 h-4 text-rose-600" />,
      items: [
        { name: 'TicketSchema', path: '/models/Ticket.ts', description: 'Id, title, customer, category, priority, status, timestamps', status: 'Ready' },
        { name: 'AgentSchema', path: '/models/Agent.ts', description: 'Id, name, email, department, activeStatus, role', status: 'Ready' },
        { name: 'AuditLogSchema', path: '/models/AuditLog.ts', description: 'Id, entityId, actorId, action, diffJson, timestamp', status: 'Ready' },
        { name: 'SLAPolicySchema', path: '/models/SLAPolicy.ts', description: 'Priority, targetResolutionHours, escalationEmails', status: 'Ready' },
        { name: 'CommentSchema', path: '/models/Comment.ts', description: 'TicketId, authorId, body, isInternal, createdAt', status: 'Ready' },
        { name: 'WorkspaceConfigSchema', path: '/models/WorkspaceConfig.ts', description: 'Org preferences, theme settings, API keys', status: 'Ready' }
      ]
    },
    {
      id: 'validations',
      name: 'Validations',
      count: 8,
      colorClass: 'text-teal-600 bg-teal-50 border-teal-200',
      badgeBg: 'bg-teal-100 text-teal-800',
      icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
      items: [
        { name: 'TicketCreationValidator', path: '/validators/TicketCreation.validator.ts', description: 'Validates non-empty title, category enum, priority enum', status: 'Ready' },
        { name: 'StatusTransitionValidator', path: '/validators/StatusTransition.validator.ts', description: 'Guards valid state changes: Open -> In Progress -> Resolved', status: 'Ready' },
        { name: 'AssigneeValidator', path: '/validators/Assignee.validator.ts', description: 'Confirms assignee is an active team agent', status: 'Ready' },
        { name: 'InputSanitizer', path: '/validators/InputSanitizer.ts', description: 'Strips dangerous HTML/script injections from ticket text', status: 'Ready' },
        { name: 'PaginationValidator', path: '/validators/Pagination.validator.ts', description: 'Bounds limit <= 100 and offset >= 0 parameters', status: 'Ready' },
        { name: 'AuthHeaderValidator', path: '/validators/AuthHeader.validator.ts', description: 'Inspects Bearer JWT signatures and expiration', status: 'Ready' },
        { name: 'SLAThresholdValidator', path: '/validators/SLAThreshold.validator.ts', description: 'Ensures positive hours values for escalation rules', status: 'Ready' },
        { name: 'CommentBodyValidator', path: '/validators/CommentBody.validator.ts', description: 'Bounds comment length between 1 and 4000 characters', status: 'Ready' }
      ]
    }
  ];

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    categories.forEach((c) => {
      next[c.id] = true;
    });
    setExpandedCategories(next);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Top Header matching Screenshot 3 */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            tb
          </div>
          <h2 className="font-bold text-sm text-slate-900 tracking-tight">
            Planned Application Architecture
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Subtabs Bar: Modules, Tree, Graph, Flowchart */}
      <div className="px-5 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/60 text-xs">
          {(['modules', 'tree', 'graph', 'flowchart'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveSubTab(tab)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                activeSubTab === tab
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'modules' && 'Modules'}
              {tab === 'tree' && 'Tree'}
              {tab === 'graph' && 'Graph'}
              {tab === 'flowchart' && 'Flowchart'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            8 Categories • 61 Target Modules
          </span>
          <button
            type="button"
            onClick={expandAll}
            className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer text-xs"
          >
            Expand All Sections
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-3">
        {activeSubTab === 'modules' && (
          <div className="space-y-3">
            {categories.map((cat) => {
              const isExpanded = !!expandedCategories[cat.id];
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs transition-all"
                >
                  {/* Category Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg border bg-white shadow-2xs">
                        {cat.icon}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {cat.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeBg}`}
                      >
                        {cat.count} items
                      </span>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Items List */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/30 divide-y divide-slate-100">
                      {cat.items.map((item, i) => (
                        <div
                          key={i}
                          className="px-4 py-2.5 flex items-start justify-between gap-3 text-xs hover:bg-slate-50 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900">{item.name}</span>
                              <code className="text-[10px] text-slate-400 font-mono">
                                {item.path}
                              </code>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeSubTab === 'tree' && (
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-1">
            <div className="text-indigo-400 font-bold mb-2">├── solution-builder/ (OmniBoard Support Hub)</div>
            <div>│   ├── src/</div>
            <div>│   │   ├── pages/ (7 modules)</div>
            <div>│   │   │   ├── TicketBoardPage.tsx</div>
            <div>│   │   │   └── AnalyticsPage.tsx</div>
            <div>│   │   ├── components/ (8 modules)</div>
            <div>│   │   ├── routes/ (10 endpoints)</div>
            <div>│   │   ├── controllers/ (8 modules)</div>
            <div>│   │   ├── services/ (8 modules)</div>
            <div>│   │   └── models/ (6 schemas)</div>
            <div>│   └── tests/ (100% test coverage)</div>
          </div>
        )}

        {activeSubTab === 'graph' && (
          <div className="p-8 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-3">
            <Layers className="w-8 h-8 text-indigo-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Interactive Dependency Graph</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Visualizes connections between 61 target modules, database entities, and API routes with zero circular dependencies.
            </p>
          </div>
        )}

        {activeSubTab === 'flowchart' && (
          <div className="p-8 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-3">
            <Workflow className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">System Execution Flowchart</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              End-to-end request flow: Client UI → Route Validator → Controller → Persistence Service → PostgreSQL.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

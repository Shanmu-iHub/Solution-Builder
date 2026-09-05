import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppShell } from './components/layout/AppShell';

// Home
import { DashboardHome } from './components/home/DashboardHome';

// Products
import { ProductListing } from './components/products/ProductListing';
import { SolutionArchitectWorkspace } from './components/products/SolutionArchitectWorkspace';
import { SolutionFactorWorkspace } from './components/products/SolutionFactorWorkspace';
import { TestingWorkspace } from './components/products/TestingWorkspace';
import { MonitoringWorkspace } from './components/products/MonitoringWorkspace';
import { FinOpsWorkspace } from './components/products/FinOpsWorkspace';
import { AuditWorkspace } from './components/products/AuditWorkspace';
import { ComplianceWorkspace } from './components/products/ComplianceWorkspace';
import { AnalyticsWorkspace } from './components/products/AnalyticsWorkspace';
import { DevOpsWorkspace } from './components/products/DevOpsWorkspace';
import { AIModelsWorkspace } from './components/products/AIModelsWorkspace';

// Services
import { ServiceListing } from './components/services/ServiceListing';
import { AIChatWorkspace } from './components/services/AIChatWorkspace';
import { AIImageWorkspace } from './components/services/AIImageWorkspace';
import { AIVideoWorkspace } from './components/services/AIVideoWorkspace';
import { AIMusicWorkspace } from './components/services/AIMusicWorkspace';
import { AIAudioWorkspace } from './components/services/AIAudioWorkspace';
import { AIPodsWorkspace } from './components/services/AIPodsWorkspace';

// Agents
import { AgentListing } from './components/agents/AgentListing';
import { AgentWorkspace } from './components/agents/AgentWorkspace';

// Workspace & Admin
import { ProjectsPage } from './components/workspace/ProjectsPage';
import { ActivityPage } from './components/workspace/ActivityPage';
import { UsageBillingPage } from './components/workspace/UsageBillingPage';
import { SettingsPage } from './components/workspace/SettingsPage';

const AppContent: React.FC = () => {
  const { currentView } = useNavigation();

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome />;

      // Products
      case 'products':
        return <ProductListing />;
      case 'product-solution-architect':
        return <SolutionArchitectWorkspace />;
      case 'product-solution-factor':
        return <SolutionFactorWorkspace />;
      case 'product-testing':
        return <TestingWorkspace />;
      case 'product-monitoring':
        return <MonitoringWorkspace />;
      case 'product-finops':
        return <FinOpsWorkspace />;
      case 'product-audit':
        return <AuditWorkspace />;
      case 'product-compliance':
        return <ComplianceWorkspace />;
      case 'product-analytics':
        return <AnalyticsWorkspace />;
      case 'product-devops':
        return <DevOpsWorkspace />;
      case 'product-ai-models':
        return <AIModelsWorkspace />;

      // Services
      case 'services':
        return <ServiceListing />;
      case 'service-ai-chat':
        return <AIChatWorkspace />;
      case 'service-ai-image':
        return <AIImageWorkspace />;
      case 'service-ai-video':
        return <AIVideoWorkspace />;
      case 'service-ai-music':
        return <AIMusicWorkspace />;
      case 'service-ai-audio':
        return <AIAudioWorkspace />;
      case 'service-ai-pods':
        return <AIPodsWorkspace />;

      // Agents
      case 'agents':
        return <AgentListing />;
      case 'agent-meeting-notes':
        return <AgentWorkspace agentId="meeting-notes" />;
      case 'agent-deep-research':
        return <AgentWorkspace agentId="deep-research" />;
      case 'agent-fact-check':
        return <AgentWorkspace agentId="fact-check" />;
      case 'agent-call-for-me':
        return <AgentWorkspace agentId="call-for-me" />;
      case 'agent-translation':
        return <AgentWorkspace agentId="translation" />;
      case 'agent-download-for-me':
        return <AgentWorkspace agentId="download-for-me" />;

      // Workspace & Admin
      case 'projects':
        return <ProjectsPage />;
      case 'activity':
        return <ActivityPage />;
      case 'usage':
      case 'billing':
        return <UsageBillingPage />;
      case 'settings':
      case 'team':
      case 'roles':
      case 'api-keys':
      case 'integrations':
        return <SettingsPage />;

      default:
        return <DashboardHome />;
    }
  };

  return <AppShell>{renderContent()}</AppShell>;
};

export function App() {
  return (
    <NavigationProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </NavigationProvider>
  );
}

export default App;

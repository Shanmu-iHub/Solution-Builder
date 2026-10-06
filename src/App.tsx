import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './components/landing/LandingPage';

// Home
import { DashboardHome } from './components/home/DashboardHome';

// Products
import { ProductListing } from './components/products/ProductListing';
import { SolutionBuilderFullStack } from './components/products/SolutionBuilderFullStack';
import { SolutionBuilderFrontend } from './components/products/SolutionBuilderFrontend';
import { SolutionBuilderSuperAgent } from './components/products/SolutionBuilderSuperAgent';
import { SolutionArchitectWorkspace } from './components/products/SolutionArchitectWorkspace';
import { SolutionFactorWorkspace } from './components/products/SolutionFactorWorkspace';
import { TestingWorkspace } from './components/products/TestingWorkspace';
import { MonitoringWorkspace } from './components/products/MonitoringWorkspace';
import { FinOpsWorkspace } from './components/products/FinOpsWorkspace';
import { AuditWorkspace } from './components/products/AuditWorkspace';
import { ComplianceWorkspace } from './components/products/ComplianceWorkspace';
import { AnalyticsWorkspace } from './components/products/AnalyticsWorkspace';
import { DevOpsWorkspace } from './components/products/DevOpsWorkspace';
import { GamificationsWorkspace } from './components/products/GamificationsWorkspace';
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
import { AgentBuilderCanvas } from './components/agents/AgentBuilderCanvas';
import { AgentWorkspace } from './components/agents/AgentWorkspace';
import { CustomAgentWorkspace } from './components/agents/CustomAgentWorkspace';

// Workspace & Admin
import { ProjectsPage } from './components/workspace/ProjectsPage';
import { ActivityPage } from './components/workspace/ActivityPage';
import { UsageBillingPage } from './components/workspace/UsageBillingPage';
import { SettingsPage } from './components/workspace/SettingsPage';
import { HelpSupportPage } from './components/workspace/HelpSupportPage';
import { VaultPage } from './components/workspace/VaultPage';
import { MarketplacePage } from './components/marketplace/MarketplacePage';
import { RequirementGatheringWorkspace } from './components/requirement-gathering/RequirementGatheringWorkspace';
import { SolutionBuilderIDE } from './components/products/solution-builder-ide/SolutionBuilderIDE';

const AppContent: React.FC = () => {
  const { currentView } = useNavigation();

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome />;

      // Solution Builder
      case 'requirement-gathering':
        return <RequirementGatheringWorkspace />;
      case 'solution-builder-ide':
        return <SolutionBuilderIDE />;
      case 'solution-builder-fullstack':
        return <SolutionBuilderFullStack />;
      case 'solution-builder-frontend':
        return <SolutionBuilderFrontend />;
      case 'solution-builder-superagent':
        return <SolutionBuilderSuperAgent />;

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
      case 'product-gamifications':
        return <GamificationsWorkspace />;
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
      case 'agent-builder':
        return <AgentBuilderCanvas />;
      case 'agent-listing':
        return <AgentListing />;
      case 'custom-agent':
        return <CustomAgentWorkspace />;
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
      case 'support':
        return <HelpSupportPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'vault':
        return <VaultPage />;
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

const RootGate: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <LandingPage />;
  return (
    <NavigationProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </NavigationProvider>
  );
};

export function App() {
  return (
    <AuthProvider>
      <RootGate />
    </AuthProvider>
  );
}

export default App;

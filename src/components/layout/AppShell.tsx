import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { GlobalSearch } from './GlobalSearch';
import { Footer } from './Footer';
import { RightAIChatbot } from '../chat/RightAIChatbot';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isSidebarExpanded, currentView } = useNavigation();
  const isCanvasView = currentView === 'agents' || currentView === 'agent-builder';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Fixed Header */}
      <TopHeader />

      {/* Global Search Command Palette */}
      <GlobalSearch />

      <div className="flex-1 flex pt-14">
        {/* Left Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main
          className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
            isSidebarExpanded ? 'lg:pl-64' : 'lg:pl-[68px]'
          }`}
        >
          {isCanvasView ? (
            <div className="flex-1 w-full h-[calc(100vh-56px)] overflow-hidden">
              {children}
            </div>
          ) : currentView === 'requirement-gathering' ? (
            <div className="flex-1 w-full flex flex-col">
              {children}
              <Footer />
            </div>
          ) : (
            <>
              <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full">
                {children}
              </div>
              {/* Footer */}
              <Footer />
            </>
          )}
        </main>
      </div>

      {/* Rightside AI Assistant Chatbot */}
      <RightAIChatbot />
    </div>
  );
};


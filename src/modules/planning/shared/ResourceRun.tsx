import { createContext, useContext } from 'react';

/** Lets a planning stage ask the workspace to show the Skills / Knowledge Base popup while it loads, and wait until it has finished. */
export interface ResourceRun {
  presentSkills: () => Promise<void>;
  presentKnowledge: () => Promise<void>;
}

export const ResourceRunContext = createContext<ResourceRun>({ presentSkills: async () => {}, presentKnowledge: async () => {} });

export const useResourceRun = () => useContext(ResourceRunContext);

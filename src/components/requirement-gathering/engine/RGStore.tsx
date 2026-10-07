import React, { createContext, useCallback, useContext, useState } from 'react';
import { StageId, StageStatus } from '../../../services/csuite/types';

// Where a value came from — shown next to every value in the UI
export type SlotSource = 'user' | 'answer' | 'research' | 'kb' | 'derived' | 'assumption';
export type SlotStatus = 'known' | 'missing' | 'not_found' | 'assumed';

export interface Slot {
  id: string;
  phase: StageId;
  label: string;
  value: string;
  source: SlotSource;
  status: SlotStatus;
  updatedAt: string;
}

export type RunTag = 'Engine' | 'Skills' | 'KB' | 'Research' | 'Question' | 'Database';
export type RunStepStatus = 'waiting' | 'running' | 'done' | 'paused' | 'not_found' | 'skipped';

export interface RunStep {
  id: string;
  label: string;
  tag: RunTag;
  status: RunStepStatus;
  detail?: string;
  // What the step found or planned (matched skills, research queries)
  items?: string[];
}

export interface SkillMatch {
  id: string;
  name: string;
  version: string;
  matchedOn: string[];
}

interface RGStoreValue {
  slots: Record<string, Slot>;
  setSlot: (slot: Omit<Slot, 'updatedAt'>) => void;
  statuses: Record<StageId, StageStatus>;
  setStatus: (stage: StageId, status: StageStatus) => void;
  versions: Partial<Record<StageId, number>>;
  bumpVersion: (stage: StageId) => number;
  // Per-phase working state (so a phase keeps its progress when the user navigates away)
  phaseData: Partial<Record<StageId, any>>;
  setPhaseData: (stage: StageId, data: any) => void;
  skills: Partial<Record<StageId, SkillMatch[]>>;
  setSkills: (stage: StageId, matches: SkillMatch[]) => void;
}

const INITIAL_STATUSES: Record<StageId, StageStatus> = {
  'idea-understanding': 'Draft',
  'opportunity': 'Draft',
  'problem-discovery': 'Draft',
  'solution-discovery': 'Draft',
  'business-model': 'Draft',
  'product-definition': 'Draft',
  'requirements': 'Draft',
  'documents': 'Draft',
  'review': 'Draft',
  'handoff': 'Draft'
};

const RGStoreContext = createContext<RGStoreValue | null>(null);

export const RGStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Record<string, Slot>>({});
  const [statuses, setStatuses] = useState(INITIAL_STATUSES);
  const [versions, setVersions] = useState<Partial<Record<StageId, number>>>({});
  const [phaseData, setPhaseDataState] = useState<Partial<Record<StageId, any>>>({});
  const [skills, setSkillsState] = useState<Partial<Record<StageId, SkillMatch[]>>>({});

  const setSlot = useCallback((slot: Omit<Slot, 'updatedAt'>) => {
    setSlots((prev) => ({ ...prev, [slot.id]: { ...slot, updatedAt: new Date().toISOString() } }));
  }, []);

  const setStatus = useCallback((stage: StageId, status: StageStatus) => {
    setStatuses((prev) => ({ ...prev, [stage]: status }));
  }, []);

  const bumpVersion = useCallback(
    (stage: StageId) => {
      const next = (versions[stage] || 0) + 1;
      setVersions((prev) => ({ ...prev, [stage]: next }));
      return next;
    },
    [versions]
  );

  const setPhaseData = useCallback((stage: StageId, data: any) => {
    setPhaseDataState((prev) => ({ ...prev, [stage]: data }));
  }, []);

  const setSkills = useCallback((stage: StageId, matches: SkillMatch[]) => {
    setSkillsState((prev) => ({ ...prev, [stage]: matches }));
  }, []);

  return (
    <RGStoreContext.Provider
      value={{ slots, setSlot, statuses, setStatus, versions, bumpVersion, phaseData, setPhaseData, skills, setSkills }}
    >
      {children}
    </RGStoreContext.Provider>
  );
};

export const useRGStore = () => {
  const ctx = useContext(RGStoreContext);
  if (!ctx) throw new Error('useRGStore must be used inside RGStoreProvider');
  return ctx;
};

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { sleep } from '../ui';
import { ALLOWED_COLLECTIONS, DEFAULT_DEFINITION, availableRegistry, buildMap, buildSchema, searchMap, seedProjects } from './mockData';
import { AvailableProject, BuildPhase, CollectionPreview, ProjectGraphDefinition, ProjectMap, ProjectView, SearchMode, SearchResult } from './types';

const phaseFor = (done: number): BuildPhase => (done < 8 ? 'queued' : done < 30 ? 'reading' : done < 60 ? 'extracting' : done < 82 ? 'embedding' : done < 100 ? 'writing' : 'done');

export const validateDefinition = (def: ProjectGraphDefinition): string[] => {
  const issues: string[] = [];
  const ids = def.entitySources.map(s => s.id);
  ids.forEach((id, i) => {
    if (!id.trim()) issues.push(`Entity #${i + 1} has no id.`);
    else if (ids.indexOf(id) !== i) issues.push(`The entity id "${id}" is used more than once.`);
  });
  def.entitySources.forEach(s => {
    if (!ALLOWED_COLLECTIONS.includes(s.collection)) issues.push(`Entity "${s.id}": the collection "${s.collection}" is not available.`);
    if (!s.idField.trim()) issues.push(`Entity "${s.id}": choose the field that identifies an item.`);
    if (!s.entityType.trim()) issues.push(`Entity "${s.id}": give it an entity type.`);
    if (s.parent && !ids.includes(s.parent)) issues.push(`Entity "${s.id}": the parent "${s.parent}" does not exist.`);
    if (s.parent === s.id) issues.push(`Entity "${s.id}" cannot be its own parent.`);
  });
  def.relationships.forEach(r => {
    if (!/^[A-Z][A-Z0-9_]*$/.test(r.name)) issues.push(`Relationship "${r.name || '(no name)'}": use UPPER_SNAKE_CASE, e.g. TRACES_TO.`);
    if (!ids.includes(r.from)) issues.push(`Relationship "${r.name}": "from" must be one of the entities.`);
    if (r.kind === 'reference') {
      if (!r.field.trim()) issues.push(`Relationship "${r.name}": say which field holds the ids.`);
      const to = Array.isArray(r.to) ? r.to : [r.to];
      if (to.length === 0 || to.some(t => !ids.includes(t))) issues.push(`Relationship "${r.name}": pick at least one valid target.`);
    } else {
      if (!r.fromField.trim() || !r.toField.trim()) issues.push(`Relationship "${r.name}": both fields are needed.`);
      if (!ids.includes(r.to)) issues.push(`Relationship "${r.name}": "to" must be one of the entities.`);
    }
  });
  return issues;
};

interface Store {
  projects: ProjectView[];
  available: AvailableProject[];
  register: (projectId: string) => Promise<ProjectView>;
  startBuild: (projectId: string) => void;
  getDefinition: (projectId: string) => ProjectGraphDefinition;
  saveDefinition: (projectId: string, def: ProjectGraphDefinition) => Promise<void>;
  getSchema: (projectId: string) => Promise<CollectionPreview[]>;
  getMap: (projectId: string, entityTypes: string[], relationshipTypes: string[]) => ProjectMap | null;
  search: (projectId: string, text: string, mode: SearchMode) => Promise<SearchResult>;
}

const Ctx = createContext<Store | null>(null);

export const KnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectView[]>(seedProjects);
  const [registered, setRegistered] = useState<string[]>(seedProjects.map(p => p.projectId));
  const [definitions, setDefinitions] = useState<Record<string, ProjectGraphDefinition>>({});
  const [maps, setMaps] = useState<Record<string, ProjectMap>>(() => ({ 'prj-loyalty': buildMap('prj-loyalty', DEFAULT_DEFINITION) }));
  const timers = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  const defsRef = useRef(definitions);
  defsRef.current = definitions;

  const seedBuilt = useRef(false);
  useEffect(() => {
    if (seedBuilt.current) return;
    seedBuilt.current = true;
    const map = buildMap('prj-loyalty', DEFAULT_DEFINITION);
    setProjects(list => list.map(p => (p.projectId === 'prj-loyalty' ? finishBuild(p, map, DEFAULT_DEFINITION, new Date(Date.now() - 3 * 86400000).toISOString()) : p)));
  }, []);

  useEffect(() => () => Object.values(timers.current).forEach(clearInterval), []);

  const patch = useCallback((id: string, fn: (p: ProjectView) => ProjectView) => setProjects(list => list.map(p => (p.projectId === id ? fn(p) : p))), []);

  const available = useMemo(() => availableRegistry.filter(a => !registered.includes(a.projectId)), [registered]);

  const store: Store = {
    projects,
    available,

    register: async projectId => {
      await sleep(500);
      const a = availableRegistry.find(x => x.projectId === projectId)!;
      const now = new Date().toISOString();
      const project: ProjectView = {
        projectId, name: a.name, description: null, phase: a.phase, stage: a.stage, status: 'registered', isDefaultDefinition: true,
        build: { buildId: null, phase: null, progress: null, startedAt: null, completedAt: null, stats: null, report: null, error: null },
        registeredAt: now, updatedAt: now,
      };
      setProjects(list => [project, ...list]);
      setRegistered(r => [...r, projectId]);
      return project;
    },

    startBuild: projectId => {
      if (timers.current[projectId]) return;
      patch(projectId, p => ({ ...p, status: 'building', build: { ...p.build, buildId: `b-${Date.now().toString().slice(-4)}`, phase: 'queued', progress: { total: 100, done: 0 }, startedAt: new Date().toISOString(), error: null } }));
      let done = 0;
      timers.current[projectId] = setInterval(() => {
        done += 4 + Math.floor(Math.random() * 5);
        if (done >= 100) {
          clearInterval(timers.current[projectId]);
          delete timers.current[projectId];
          const def = defsRef.current[projectId] || DEFAULT_DEFINITION;
          const map = buildMap(projectId, def);
          setMaps(m => ({ ...m, [projectId]: map }));
          patch(projectId, p => finishBuild(p, map, def));
          return;
        }
        patch(projectId, p => ({ ...p, build: { ...p.build, phase: phaseFor(done), progress: { total: 100, done } } }));
      }, 450);
    },

    getDefinition: projectId => definitions[projectId] || DEFAULT_DEFINITION,

    saveDefinition: async (projectId, def) => {
      await sleep(400);
      setDefinitions(d => ({ ...d, [projectId]: structuredClone(def) }));
      patch(projectId, p => ({ ...p, isDefaultDefinition: JSON.stringify(def) === JSON.stringify(DEFAULT_DEFINITION), updatedAt: new Date().toISOString() }));
    },

    getSchema: async projectId => {
      await sleep(900);
      return buildSchema(projectId);
    },

    getMap: (projectId, entityTypes, relationshipTypes) => {
      const map = maps[projectId];
      if (!map) return null;
      if (!entityTypes.length && !relationshipTypes.length) return map;
      const nodes = map.nodes.filter(n => !entityTypes.length || entityTypes.includes(n.type));
      const keep = new Set(nodes.map(n => n.id));
      const edges = map.edges.filter(e => keep.has(e.source) && keep.has(e.target) && (!relationshipTypes.length || relationshipTypes.includes(e.type)));
      return { ...map, nodes, edges };
    },

    search: async (projectId, text, mode) => {
      await sleep(500);
      const map = maps[projectId];
      const records = map ? searchMap(map, text, mode) : [];
      const top = records[0]?.score ?? 0;
      const second = records[1]?.score ?? 0;
      return { records, semantic: mode === 'keyword' || mode === 'exact' ? 'skipped' : 'used', ambiguous: records.length > 1 && top - second < 0.03 };
    },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

function finishBuild(p: ProjectView, map: ProjectMap, def: ProjectGraphDefinition, completedAt = new Date().toISOString()): ProjectView {
  const perRelationship: Record<string, { created: number; unresolved: number }> = {};
  def.relationships.forEach((r, i) => (perRelationship[`${r.name} (${r.from} → ${Array.isArray(r.to) ? r.to.join('|') : r.to})`] = { created: map.edges.filter(e => e.type === r.name).length, unresolved: i % 3 === 1 ? 2 : 0 }));
  const perSource: Record<string, { documents: number; items: number; skippedNoId: number }> = {};
  def.entitySources.forEach(s => (perSource[s.id] = { documents: 1 + (s.id.length % 3), items: map.entityTypeCounts[s.entityType] || 0, skippedNoId: 0 }));
  const entities = map.nodes.length;
  return {
    ...p,
    status: 'ready',
    updatedAt: completedAt,
    build: {
      ...p.build,
      phase: 'done',
      progress: { total: 100, done: 100 },
      completedAt,
      error: null,
      stats: { entities, relationships: map.edges.length, byType: map.entityTypeCounts, truncated: false, embedded: Math.max(0, entities - 3) },
      report: { perSource, perRelationship, missingCollections: ['task_breakdowns'], truncated: false },
    },
  };
}

export const useKnowledge = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useKnowledge must be used within KnowledgeProvider');
  return ctx;
};

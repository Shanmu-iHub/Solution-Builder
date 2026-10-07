export type ProjectGraphStatus = 'registered' | 'building' | 'ready' | 'failed';
export type BuildPhase = 'queued' | 'reading' | 'extracting' | 'embedding' | 'writing' | 'done';

export interface BuildReport {
  perSource: Record<string, { documents: number; items: number; skippedNoId: number }>;
  perRelationship: Record<string, { created: number; unresolved: number }>;
  missingCollections: string[];
  truncated: boolean;
}

export interface BuildStats {
  entities: number;
  relationships: number;
  byType: Record<string, number>;
  truncated: boolean;
  embedded: number;
}

export interface ProjectView {
  projectId: string;
  name: string;
  description: string | null;
  phase: string | null;
  stage: string | null;
  status: ProjectGraphStatus;
  isDefaultDefinition: boolean;
  build: {
    buildId: string | null;
    phase: BuildPhase | null;
    progress: { total: number; done: number } | null;
    startedAt: string | null;
    completedAt: string | null;
    stats: BuildStats | null;
    report: BuildReport | null;
    error: string | null;
  };
  registeredAt: string;
  updatedAt: string;
}

export interface AvailableProject {
  projectId: string;
  name: string;
  phase: string;
  stage: string | null;
}

export interface FieldInfo {
  path: string;
  types: string[];
  seenIn: number;
}

export interface CollectionPreview {
  collection: string;
  exists: boolean;
  documentCount: number;
  fields: FieldInfo[];
  fieldsTruncated: boolean;
  samples: unknown[];
}

export interface EntitySourceDefinition {
  id: string;
  collection: string;
  entityType: string;
  path: string;
  idField: string;
  idPrefix?: string;
  labelField: string;
  textFields: string[];
  parent?: string;
  parentRelationship?: string;
  versionField?: string;
  latestOnly?: boolean;
}

export interface ReferenceRelationship {
  name: string;
  kind: 'reference';
  from: string;
  field: string;
  to: string | string[];
  valuePrefix?: string;
}

export interface CommonValueRelationship {
  name: string;
  kind: 'commonValue';
  from: string;
  fromField: string;
  to: string;
  toField: string;
}

export type RelationshipDefinition = ReferenceRelationship | CommonValueRelationship;

export interface ProjectGraphDefinition {
  entitySources: EntitySourceDefinition[];
  relationships: RelationshipDefinition[];
}

export interface MapNode {
  id: string;
  type: string;
  label: string;
  description: string;
  version: string | null;
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ProjectMap {
  nodes: MapNode[];
  edges: MapEdge[];
  totalNodes: number;
  entityTypeCounts: Record<string, number>;
  relationshipTypeCounts: Record<string, number>;
}

export type SearchMode = 'hybrid' | 'keyword' | 'semantic' | 'exact';

export interface FoundRecord {
  id: string;
  type: string;
  label: string;
  score: number;
  matchedBy: string[];
}

export interface SearchResult {
  records: FoundRecord[];
  semantic: 'used' | 'skipped' | 'unavailable';
  ambiguous: boolean;
}

import React, { useState } from 'react';
import { SkillsLibraryPage } from './SkillsLibraryPage';
import { SkillCreatePage } from './SkillCreatePage';
import { SkillDetailPage } from './SkillDetailPage';

type Route = { page: 'list' } | { page: 'create' } | { page: 'detail'; id: string };

/** Skills Library — list, create wizard and detail/edit, driven by in-memory mock data. */
export const SkillsModule: React.FC = () => {
  const [route, setRoute] = useState<Route>({ page: 'list' });
  const go = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0 });
  };

  if (route.page === 'create') return <SkillCreatePage onCancel={() => go({ page: 'list' })} onCreated={id => go({ page: 'detail', id })} />;
  if (route.page === 'detail') return <SkillDetailPage assetId={route.id} onBack={() => go({ page: 'list' })} onOpen={id => go({ page: 'detail', id })} />;
  return <SkillsLibraryPage onCreate={() => go({ page: 'create' })} onOpen={id => go({ page: 'detail', id })} />;
};

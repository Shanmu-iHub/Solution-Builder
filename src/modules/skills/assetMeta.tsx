import React from 'react';
import { BookOpen, ClipboardList, Cpu, Folder, ShieldAlert } from 'lucide-react';
import { Badge, Tone } from '../ui';
import { ACCESS_LABEL, ASSET_TYPE_LABEL, Asset, AssetType, LifecycleStatus, STATUS_LABEL } from './types';

export const typeIcon = (type: AssetType, cls = 'w-4 h-4') => {
  const Icon = { capability: Folder, skill: Cpu, knowledge: BookOpen, instruction: ClipboardList, policy: ShieldAlert }[type];
  return <Icon className={cls} />;
};

export const typeTone: Record<AssetType, Tone> = { capability: 'slate', skill: 'blue', knowledge: 'teal', instruction: 'indigo', policy: 'orange' };

export const TypeBadge: React.FC<{ type: AssetType }> = ({ type }) => (
  <Badge tone={typeTone[type]}>
    {typeIcon(type, 'w-3 h-3')}
    {ASSET_TYPE_LABEL[type]}
  </Badge>
);

const statusTone: Record<LifecycleStatus, Tone> = { DRAFT: 'amber', UNDER_REVIEW: 'blue', APPROVED: 'teal', PUBLISHED: 'green', DEPRECATED: 'orange', ARCHIVED: 'slate' };

export const AssetStatusBadge: React.FC<{ asset: Pick<Asset, 'status' | 'acquisitionType'> }> = ({ asset }) =>
  asset.acquisitionType === 'INSTALL' ? <Badge tone="blue">Installed</Badge> : <Badge tone={statusTone[asset.status]} dot>{STATUS_LABEL[asset.status]}</Badge>;

export const AccessBadge: React.FC<{ access: Asset['accessibility'] }> = ({ access }) => (
  <Badge tone={access === 'PUBLIC' ? 'green' : access === 'TEAM' ? 'blue' : 'slate'}>{ACCESS_LABEL[access]}</Badge>
);

export const assetIcon = (type: AssetType, size: 'sm' | 'md' = 'md') => (
  <div className={`${size === 'md' ? 'w-10 h-10' : 'w-8 h-8'} shrink-0 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200`}>{typeIcon(type)}</div>
);

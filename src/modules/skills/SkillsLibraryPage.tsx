import React, { useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, Clock, Filter, Folder, LayoutDashboard, Pencil, Plus, ShieldCheck, SlidersHorizontal, Star, Trash2 } from 'lucide-react';
import { Badge, Button, Card, ConfirmDialog, Dialog, EmptyBlock, Field, Input, PageHeader, Pagination, RowMenu, SearchInput, Select, SectionLabel, Tabs, Textarea, timeAgo, useToast, cx } from '../ui';
import { useSkills } from './SkillsStore';
import { AccessBadge, AssetStatusBadge, TypeBadge, assetIcon, typeIcon } from './assetMeta';
import { ASSET_TYPE_LABEL, Asset, AssetType, MARKETPLACE_CATEGORIES } from './types';

interface Props {
  onCreate: () => void;
  onOpen: (id: string) => void;
}

type Row = Asset & { pendingDraft?: Asset };

export const SkillsLibraryPage: React.FC<Props> = ({ onCreate, onOpen }) => {
  const { library, pins, togglePin, updateAsset, deleteAsset, link, unlink } = useSkills();
  const { toast } = useToast();

  const [tab, setTab] = useState<'overview' | 'explorer'>('overview');
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Exclude<AssetType, 'capability'>>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');
  const [folderId, setFolderId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [confirm, setConfirm] = useState<{ id: string; label: string } | null>(null);

  const [folderDialog, setFolderDialog] = useState(false);
  const [editingFolder, setEditingFolder] = useState(false);
  const [folderForm, setFolderForm] = useState({ displayName: '', shortDescription: '', description: '', category: '', subCategory: '' });

  const [linkOpen, setLinkOpen] = useState(false);
  const [linkType, setLinkType] = useState<Exclude<AssetType, 'capability'>>('skill');
  const [linkQuery, setLinkQuery] = useState('');

  const folders = library.filter(a => a.type === 'capability');
  const items = library.filter(a => a.type !== 'capability');
  const activeFolder = folders.find(f => f.id === folderId) || null;

  const countIn = (capId: string) => items.filter(i => i.capabilityIds.includes(capId)).length;

  const filtered = useMemo(() => {
    let list: Row[] = items;
    if (folderId) list = list.filter(i => i.capabilityIds.includes(folderId));
    if (typeFilter !== 'all') list = list.filter(i => i.type === typeFilter);
    if (statusFilter !== 'all') list = list.filter(i => i.status === statusFilter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(i => `${i.displayName} ${i.shortDescription} ${i.id}`.toLowerCase().includes(q));
    return list;
  }, [items, folderId, typeFilter, statusFilter, query]);

  const recent = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
  const floating = items.filter(i => i.capabilityIds.length === 0);
  const pinned = items.filter(i => pins.includes(i.id));
  const counts: { label: string; n: number; sub: string; type: AssetType }[] = [
    { label: 'Folders', n: folders.length, sub: 'Capability containers', type: 'capability' },
    { label: 'Skills', n: items.filter(i => i.type === 'skill').length, sub: 'Action tasks', type: 'skill' },
    { label: 'Knowledge', n: items.filter(i => i.type === 'knowledge').length, sub: 'Corporate facts', type: 'knowledge' },
    { label: 'Instructions', n: items.filter(i => i.type === 'instruction').length, sub: 'Directives', type: 'instruction' },
    { label: 'Policies', n: items.filter(i => i.type === 'policy').length, sub: 'Guardrails', type: 'policy' },
  ];

  const candidates = items.filter(i => i.type === linkType && folderId && !i.capabilityIds.includes(folderId) && `${i.displayName} ${i.shortDescription} ${i.id}`.toLowerCase().includes(linkQuery.toLowerCase()));

  const openFolder = () => {
    if (!activeFolder) return;
    setFolderForm({ displayName: activeFolder.displayName, shortDescription: activeFolder.shortDescription, description: activeFolder.description, category: activeFolder.category, subCategory: activeFolder.subCategory });
    setEditingFolder(false);
    setFolderDialog(true);
  };

  const onTogglePin = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const removing = pins.includes(id);
    togglePin(id);
    toast({ title: removing ? 'Unpinned' : 'Pinned', description: removing ? 'Removed from quick-access.' : 'Added to your pinned skills.' });
  };

  const accessBorder = 'border-slate-200';

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Skills Library"
        subtitle="Govern, organize, and build your workspace capabilities, skills, guidelines, and compliance rules."
        icon={<Folder className="w-5 h-5" />}
        actions={
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={onCreate}>
            Assemble New Skill
          </Button>
        }
      />

      <Tabs
        className="mb-6"
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'overview', label: 'Library Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'explorer', label: 'Skill Explorer', icon: <Folder className="w-4 h-4" /> },
        ]}
      />

      {tab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <Card padded={false} className="overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-slate-200">
              {counts.map(c => (
                <div key={c.label} className="flex flex-col items-center justify-center py-5 px-3 text-center">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-2">{typeIcon(c.type)}</div>
                  <span className="text-3xl font-bold tracking-tight text-[#0F172A]">{c.n}</span>
                  <span className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider mt-1">{c.label}</span>
                  <span className="text-[12.5px] text-slate-400">{c.sub}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionLabel icon={<Clock className="w-3.5 h-3.5" />}>Recent Catalog Activity</SectionLabel>
              {recent.length === 0 ? (
                <p className="text-[13.5px] text-slate-400 italic">Nothing registered yet.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recent.map(a => (
                    <div key={a.id} onClick={() => onOpen(a.id)} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {assetIcon(a.type, 'sm')}
                        <div className="min-w-0">
                          <p className="text-[14.5px] font-semibold text-[#0F172A] truncate">{a.displayName}</p>
                          <p className="text-[12.5px] text-slate-400">{timeAgo(a.updatedAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {a.pendingDraft && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onOpen(a.pendingDraft!.id);
                            }}
                            className="text-[11.5px] font-bold uppercase tracking-wider text-[#2563EB] hover:underline"
                          >
                            Draft pending
                          </button>
                        )}
                        <AssetStatusBadge asset={a} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <SectionLabel icon={<AlertCircle className="w-3.5 h-3.5 text-amber-500" />}>Floating Skills (Unlinked)</SectionLabel>
              {floating.length === 0 ? (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-[13.5px] text-emerald-700">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                  All skills are cataloged under folders.
                </div>
              ) : (
                <>
                  <p className="text-[13.5px] text-slate-400 mb-2">These items are not in any folder. Link them to keep the catalog organised.</p>
                  <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
                    {floating.map(a => (
                      <div key={a.id} onClick={() => onOpen(a.id)} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {assetIcon(a.type, 'sm')}
                          <span className="text-[14.5px] font-semibold text-[#0F172A] truncate">{a.displayName}</span>
                        </div>
                        <Badge tone="amber">Unassigned</Badge>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          <Card>
            <SectionLabel icon={<Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}>Pinned Core Skills</SectionLabel>
            {pinned.length === 0 ? (
              <div className="p-8 text-center text-[13.5px] text-slate-400 border border-dashed border-slate-200 rounded-xl">No skills pinned. Click the star on any skill in the Explorer tab for quick access.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pinned.map(a => (
                  <div key={a.id} onClick={() => onOpen(a.id)} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-[#2563EB]/40 hover:bg-blue-50/30 cursor-pointer transition">
                    <div className="flex items-center gap-3 min-w-0">
                      {assetIcon(a.type)}
                      <div className="min-w-0">
                        <p className="text-[14.5px] font-bold text-[#0F172A] truncate">{a.displayName}</p>
                        <p className="text-[12.5px] text-slate-400 font-mono">
                          {a.type} • {a.id}
                        </p>
                      </div>
                    </div>
                    <button onClick={e => onTogglePin(a.id, e)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500" title="Unpin">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === 'explorer' && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <h2 className="text-[19px] font-bold text-[#0F172A]">Skill Explorer</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Select value={typeFilter} onChange={e => { setTypeFilter(e.target.value as any); setPage(1); }} className="!pl-8 !py-2 !text-[13.5px] !font-semibold w-40">
                    <option value="all">All types</option>
                    <option value="skill">Skills</option>
                    <option value="knowledge">Knowledge</option>
                    <option value="instruction">Instructions</option>
                    <option value="policy">Policies</option>
                  </Select>
                </div>
                <Select value={statusFilter} onChange={e => { setStatusFilter(e.target.value as any); setPage(1); }} className="!py-2 !text-[13.5px] !font-semibold w-36">
                  <option value="all">All statuses</option>
                  <option value="PUBLISHED">Live</option>
                  <option value="DRAFT">Draft</option>
                </Select>
              </div>
              <SearchInput value={query} onChange={v => { setQuery(v); setPage(1); }} placeholder="Search library…" className="sm:w-72" />
            </div>
          </div>

          {/* Folder strip */}
          <Card padded={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-4 h-11 bg-slate-50/80 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <Folder className="w-4 h-4 text-slate-500" />
                <span className="text-[13.5px] font-bold uppercase tracking-wider text-[#0F172A]">Folders</span>
                <Badge>{folders.length}</Badge>
              </div>
              {folderId && <span className="text-[12.5px] font-bold text-emerald-600 uppercase tracking-wider">Filtered</span>}
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button onClick={() => { setFolderId(null); setPage(1); }} className={cx('px-3 h-8 rounded-full border text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition', !folderId ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}>
                  All Skills
                </button>
                {folders.map(f => (
                  <button
                    key={f.id}
                    onClick={() => { setFolderId(f.id); setPage(1); }}
                    className={cx('inline-flex items-center gap-1.5 px-3 h-8 rounded-full border text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition', folderId === f.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}
                  >
                    <Folder className="w-3 h-3" />
                    {f.displayName}
                    <span className={cx('text-[11.5px] px-1.5 rounded-full', folderId === f.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500')}>{countIn(f.id)}</span>
                  </button>
                ))}
              </div>
              {activeFolder && (
                <div className="flex items-center flex-wrap justify-between gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <button onClick={openFolder} className="text-[14.5px] font-bold text-[#0F172A] hover:underline truncate">{activeFolder.displayName}</button>
                    <span className="text-[13.5px] text-slate-400 truncate hidden md:block">{activeFolder.shortDescription}</span>
                    {activeFolder.category && <Badge>{activeFolder.category}</Badge>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="xs" icon={<Folder className="w-3 h-3" />} onClick={openFolder}>Open Folder</Button>
                    <Button size="xs" variant="dark" icon={<Plus className="w-3 h-3" />} onClick={() => { setLinkQuery(''); setLinkOpen(true); }}>Link Existing</Button>
                    <Button size="xs" variant="ghost" icon={<ArrowLeft className="w-3 h-3" />} onClick={() => setFolderId(null)}>Clear</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-[#0F172A] uppercase tracking-wider">Library Skills</h3>
            <Badge>{filtered.length} result{filtered.length === 1 ? '' : 's'}</Badge>
          </div>

          {filtered.length === 0 ? (
            <EmptyBlock icon={<SlidersHorizontal className="w-6 h-6" />} title="No skills found" message="No skills match your filters. Try adjusting the type or status, or create a new skill." action={<Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={onCreate}>Assemble New Skill</Button>} />
          ) : (
            <Card padded={false}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      {['Skill name', 'Type', 'Dept. scope', 'Accessibility', 'Last updated', 'Status', 'Action'].map((h, i) => (
                        <th key={h} className={cx('px-4 h-11 text-[12.5px] font-bold uppercase tracking-wider text-[#64748B]', i >= 3 && i !== 4 && 'text-center')}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.slice((page - 1) * pageSize, page * pageSize).map(a => (
                      <tr key={a.id} onClick={() => onOpen(a.id)} className={cx('border-b last:border-0 hover:bg-slate-50/70 cursor-pointer transition-colors', accessBorder)}>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3 min-w-0">
                            {assetIcon(a.type)}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <button onClick={e => onTogglePin(a.id, e)} className="text-slate-300 hover:text-amber-400 shrink-0">
                                  <Star className={cx('w-3.5 h-3.5', pins.includes(a.id) && 'text-amber-400 fill-amber-400')} />
                                </button>
                                <p className="text-[14.5px] font-semibold text-[#0F172A] truncate max-w-[260px]">{a.displayName}</p>
                              </div>
                              <p className="text-[12.5px] text-slate-400 font-mono mt-0.5">{a.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4"><TypeBadge type={a.type} /></td>
                        <td className="px-4 text-[14.5px] text-[#64748B]">{a.department || 'Not specified'}</td>
                        <td className="px-4 text-center"><AccessBadge access={a.accessibility} /></td>
                        <td className="px-4 text-[14.5px] text-[#64748B]">{timeAgo(a.updatedAt)}</td>
                        <td className="px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <AssetStatusBadge asset={a} />
                            {a.pendingDraft && (
                              <button onClick={e => { e.stopPropagation(); onOpen(a.pendingDraft!.id); }} className="text-[11.5px] font-bold uppercase tracking-wider text-[#2563EB] hover:underline">
                                Draft pending
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-4 text-center" onClick={e => e.stopPropagation()}>
                          <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
                            <button onClick={() => onOpen(a.id)} className="px-3 h-8 text-[13.5px] font-semibold text-[#0F172A] hover:bg-slate-50 border-r border-slate-200 cursor-pointer">View</button>
                            <RowMenu
                              items={[
                                { label: 'View details', onSelect: () => onOpen(a.id) },
                                { label: 'Remove from folder', onSelect: () => { unlink(folderId!, a.id); toast({ title: 'Removed from folder' }); }, hidden: !folderId },
                                { label: 'Delete', danger: true, onSelect: () => setConfirm({ id: a.id, label: a.displayName }) },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} onPageSize={n => { setPageSize(n); setPage(1); }} />
            </Card>
          )}
        </div>
      )}

      {/* Folder dialog */}
      <Dialog
        open={folderDialog && !!activeFolder}
        onClose={() => setFolderDialog(false)}
        title={editingFolder ? 'Edit Folder' : activeFolder?.displayName || 'Folder'}
        subtitle="Capability folder"
        width="max-w-lg"
        footer={
          editingFolder ? (
            <>
              <Button onClick={() => { setEditingFolder(false); openFolder(); }}>Cancel</Button>
              <Button variant="primary" onClick={() => { updateAsset(activeFolder!.id, folderForm); setEditingFolder(false); toast({ title: 'Folder updated' }); }}>Save</Button>
            </>
          ) : (
            <>
              <Button variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => setConfirm({ id: activeFolder!.id, label: activeFolder!.displayName })}>Delete</Button>
              <Button variant="primary" icon={<Pencil className="w-3.5 h-3.5" />} onClick={() => setEditingFolder(true)}>Edit</Button>
            </>
          )
        }
      >
        {editingFolder ? (
          <div className="space-y-4">
            <Field label="Display title"><Input value={folderForm.displayName} onChange={e => setFolderForm({ ...folderForm, displayName: e.target.value })} /></Field>
            <Field label="Short description"><Input value={folderForm.shortDescription} onChange={e => setFolderForm({ ...folderForm, shortDescription: e.target.value })} /></Field>
            <Field label="Description"><Textarea rows={3} value={folderForm.description} onChange={e => setFolderForm({ ...folderForm, description: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <Select value={folderForm.category} onChange={e => setFolderForm({ ...folderForm, category: e.target.value })}>
                  <option value="">Select…</option>
                  {MARKETPLACE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Sub category"><Input value={folderForm.subCategory} onChange={e => setFolderForm({ ...folderForm, subCategory: e.target.value })} /></Field>
            </div>
          </div>
        ) : (
          <dl className="space-y-3 text-[14.5px]">
            {[['Short description', folderForm.shortDescription], ['Description', folderForm.description], ['Category', folderForm.category], ['Sub category', folderForm.subCategory]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">{k}</dt>
                <dd className="text-[#334155] mt-0.5">{v || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </Dialog>

      {/* Link existing dialog */}
      <Dialog open={linkOpen && !!activeFolder} onClose={() => setLinkOpen(false)} title="Link Existing Component to Folder" subtitle={`Folder: ${activeFolder?.displayName}`} width="max-w-2xl" footer={<Button onClick={() => setLinkOpen(false)}>Close</Button>}>
        <Tabs
          className="mb-4"
          active={linkType}
          onChange={setLinkType}
          tabs={(['skill', 'knowledge', 'instruction', 'policy'] as const).map(t => ({ id: t, label: ASSET_TYPE_LABEL[t] + 's' }))}
        />
        <SearchInput value={linkQuery} onChange={setLinkQuery} placeholder={`Search ${linkType}s by name, description or ID…`} className="mb-4" />
        <div className="space-y-2 min-h-[220px]">
          {candidates.length === 0 ? (
            <div className="text-center py-12 text-[13.5px] text-slate-400 border border-dashed border-slate-200 rounded-xl">No linkable {linkType}s found.</div>
          ) : (
            candidates.map(c => (
              <div key={c.id} className="p-3 border border-slate-200 rounded-xl flex items-start justify-between gap-4 hover:border-slate-300">
                <div className="text-[13.5px] space-y-0.5 min-w-0">
                  <p className="font-bold text-[#0F172A] text-[14.5px]">{c.displayName} <span className="font-mono text-slate-400 font-normal">({c.id})</span></p>
                  <p className="text-slate-500">{c.shortDescription || 'No description.'}</p>
                  <p className="text-slate-400 font-mono">Version: v{c.semanticVersion}</p>
                </div>
                <Button size="sm" variant="dark" onClick={() => { link(folderId!, c.id); toast({ title: 'Linked', description: `${c.displayName} added to the folder.` }); }}>Link {ASSET_TYPE_LABEL[c.type]}</Button>
              </div>
            ))
          )}
        </div>
      </Dialog>

      <ConfirmDialog
        open={!!confirm}
        danger
        title="Delete permanently?"
        description={`“${confirm?.label}” will be removed from the library. This can't be undone.`}
        confirmText="Delete"
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return;
          deleteAsset(confirm.id);
          if (confirm.id === folderId) { setFolderId(null); setFolderDialog(false); }
          toast({ title: 'Deleted', description: confirm.label });
        }}
      />
    </div>
  );
};

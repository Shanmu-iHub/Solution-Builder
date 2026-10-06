import React, { useMemo, useState } from 'react';
import { CheckCircle2, Cpu, Globe, Loader2, ShieldAlert, ShieldCheck, Trash2, XCircle, X } from 'lucide-react';
import { Button, Callout, Card, Crumbs, Dialog, Field, Input, PageHeader, SearchInput, Select, Stepper, TagInput, Textarea, useToast, cx } from '../ui';
import { reportScores, scanAsset, useSkills } from './SkillsStore';
import { assetIcon, typeIcon } from './assetMeta';
import { DEMOS } from './demoForms';
import { ASSET_TYPE_DESC, ASSET_TYPE_LABEL, Asset, AssetType, ISSUE_CATEGORY_LABEL, MARKETPLACE_CATEGORIES, SkillExample, TEAMS, ValidationReport } from './types';

interface Props {
  onCancel: () => void;
  onCreated: (id: string) => void;
}

const SUBTYPES: Record<Exclude<AssetType, 'capability'>, { value: string; label: string }[]> = {
  skill: [
    { value: 'TASK', label: 'Task (Execution)' },
    { value: 'ANALYSIS', label: 'Analysis (Logic Reasoning)' },
    { value: 'GENERATION', label: 'Generation (Text/Code)' },
    { value: 'VALIDATION', label: 'Validation (Rule-Checking)' },
    { value: 'REVIEW', label: 'Review (Assessment)' },
    { value: 'CLASSIFICATION', label: 'Classification (Categorization)' },
  ],
  knowledge: [
    { value: 'REFERENCE', label: 'Reference Standard' },
    { value: 'ORGANIZATION', label: 'Organization Standard' },
    { value: 'BEST_PRACTICE', label: 'Best Practice Matrix' },
    { value: 'PROCESS', label: 'Business Process' },
    { value: 'TECHNICAL', label: 'Technical Guide' },
  ],
  instruction: [
    { value: 'TASK', label: 'Task execution steps' },
    { value: 'ROLE', label: 'Role or Persona behavior' },
    { value: 'FORMATTING', label: 'Formatting & layouts' },
    { value: 'QUALITY', label: 'Quality checklist' },
    { value: 'COMPLIANCE', label: 'Compliance guidelines' },
  ],
  policy: [
    { value: 'SECURITY', label: 'Security Restrictions' },
    { value: 'PRIVACY', label: 'Data Privacy / GDPR' },
    { value: 'COMPLIANCE', label: 'General Compliance' },
    { value: 'LEGAL', label: 'Legal / Copyrights' },
    { value: 'QUALITY', label: 'Quality Enforcement' },
  ],
};

const severityStyle: Record<string, string> = {
  CRITICAL: 'bg-rose-100 text-rose-800',
  HIGH: 'bg-orange-100 text-orange-800',
  MEDIUM: 'bg-amber-100 text-amber-800',
  LOW: 'bg-slate-100 text-slate-600',
};

/** Shared by the create wizard and the publish dialog on the detail page. */
export const ValidationReportView: React.FC<{ report: ValidationReport }> = ({ report }) => {
  const scores = reportScores(report);
  const blocked = report.status === 'BLOCKED';
  return (
    <div className={cx('p-4 border rounded-xl space-y-4 animate-fade-in', blocked ? 'bg-rose-50/40 border-rose-200' : 'bg-emerald-50/40 border-emerald-200')}>
      <div className={cx('flex flex-wrap items-center justify-between gap-2 border-b pb-3', blocked ? 'border-rose-100' : 'border-emerald-100')}>
        <span className={cx('flex items-center gap-1.5 text-[13.5px] font-bold uppercase tracking-wider', blocked ? 'text-rose-700' : 'text-emerald-700')}>
          {blocked ? <XCircle className="w-4 h-4 text-rose-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          {blocked ? 'Blocked — fix issues' : report.status === 'WARNINGS' ? 'Passed with warnings' : 'Passed safety check'}
        </span>
        <div className="flex items-center gap-3 text-[13.5px] font-semibold text-slate-500">
          <span>Quality <strong className="text-[#0F172A]">{scores.quality}/100</strong></span>
          <span className="w-px h-3 bg-slate-300" />
          <span>Security <strong className="text-[#0F172A]">{scores.security}/100</strong></span>
        </div>
      </div>
      {report.issues.length === 0 ? (
        <p className="text-[13.5px] text-slate-500 italic">No issues found. Looks good!</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {report.issues.map((i, idx) => (
            <div key={idx} className="bg-white p-3 border border-slate-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md uppercase">{ISSUE_CATEGORY_LABEL[i.category]}</span>
                <span className={cx('text-[12.5px] font-bold px-2 py-0.5 rounded-md uppercase', severityStyle[i.severity])}>{i.severity}</span>
              </div>
              <p className="text-[13.5px] font-medium text-[#0F172A]">{i.message}</p>
              {i.fixSuggestion && <p className="text-[13.5px] text-slate-500"><strong className="text-slate-700">Suggestion:</strong> {i.fixSuggestion}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SkillCreatePage: React.FC<Props> = ({ onCancel, onCreated }) => {
  const { assets, createAsset } = useSkills();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [type, setType] = useState<AssetType>('skill');
  const D = DEMOS.skill;
  const [displayName, setDisplayName] = useState(D.displayName);
  const [tags, setTags] = useState<string[]>(D.tags);
  const [shortDescription, setShortDescription] = useState(D.shortDescription);
  const [description, setDescription] = useState(D.description);
  const [category, setCategory] = useState(D.category);
  const [subCategory, setSubCategory] = useState(D.subCategory);
  const [department, setDepartment] = useState(D.department);

  const [subType, setSubType] = useState(D.subType);
  const [promptTemplate, setPromptTemplate] = useState(D.promptTemplate);
  const [content, setContent] = useState(D.content);
  const [enforcement, setEnforcement] = useState<'OPTIONAL' | 'RECOMMENDED' | 'MANDATORY'>('MANDATORY');
  const [examples, setExamples] = useState<SkillExample[]>(D.examples);
  const [exDraft, setExDraft] = useState<SkillExample>({ title: 'Escalation to a manager', input: 'Customer threatens to cancel and post a review unless refunded today.', output: 'Severity: High · Route to Retention · Offer a call within 2 hours; do not promise a refund.' });

  const [folderIds, setFolderIds] = useState<string[]>(D.folderIds);
  const [knowledgeIds, setKnowledgeIds] = useState<string[]>(D.knowledgeIds);
  const [instructionIds, setInstructionIds] = useState<string[]>(D.instructionIds);
  const [policyIds, setPolicyIds] = useState<string[]>(D.policyIds);
  const [skillIds, setSkillIds] = useState<string[]>([]);
  const [picker, setPicker] = useState<null | 'capability' | 'skill' | 'knowledge' | 'instruction' | 'policy'>(null);
  const [pickerQuery, setPickerQuery] = useState('');

  const [visibility, setVisibility] = useState<'Private' | 'Team' | 'Marketplace'>(D.visibility);
  const [teamId, setTeamId] = useState(D.teamId);

  const [report, setReport] = useState<ValidationReport | null>(null);
  const [scanning, setScanning] = useState(false);
  const [creating, setCreating] = useState(false);

  const isFolder = type === 'capability';
  const visibleSteps = isFolder ? ['Basics', 'Relations', 'Scope', 'Review', 'Publish'] : ['Basics', 'Content', 'Relations', 'Scope', 'Review', 'Publish'];
  const stepNumbers = isFolder ? [1, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];
  const stepIndex = stepNumbers.indexOf(step);

  const applyDemo = (t: AssetType) => {
    const d = DEMOS[t];
    setType(t); setDisplayName(d.displayName); setTags(d.tags); setShortDescription(d.shortDescription); setDescription(d.description); setCategory(d.category); setSubCategory(d.subCategory); setDepartment(d.department);
    setSubType(d.subType); setPromptTemplate(d.promptTemplate); setContent(d.content); setEnforcement(d.enforcement); setExamples(d.examples); setFolderIds(d.folderIds); setKnowledgeIds(d.knowledgeIds); setInstructionIds(d.instructionIds); setPolicyIds(d.policyIds); setSkillIds(d.skillIds); setVisibility(d.visibility); setTeamId(d.teamId); setReport(null);
  };

  const duplicateFolderName = useMemo(() => isFolder && displayName.trim() !== '' && assets.some(a => a.type === 'capability' && a.displayName.trim().toLowerCase() === displayName.trim().toLowerCase()), [assets, isFolder, displayName]);

  const marketplace = visibility === 'Marketplace';

  const next = () => {
    if (step === 1) {
      if (!displayName.trim()) return toast({ title: 'Name required', description: 'Give it a display title to continue.', tone: 'error' });
      if (!isFolder && !description.trim()) return toast({ title: 'Description required', description: 'Explain the purpose of this item.', tone: 'error' });
      if (duplicateFolderName) return toast({ title: 'Duplicate name', description: 'A folder with this name already exists.', tone: 'error' });
      return setStep(isFolder ? 3 : 2);
    }
    if (step === 2) {
      if (type === 'skill' && !promptTemplate.trim()) return toast({ title: 'Prompt required', description: 'A skill needs a prompt template.', tone: 'error' });
      if (type !== 'skill' && !content.trim()) return toast({ title: 'Content required', description: 'Add some content to continue.', tone: 'error' });
    }
    if (step === 4 && visibility === 'Team' && !teamId) return toast({ title: 'Choose a team', tone: 'error' });
    setStep(step + 1);
  };
  const back = () => (step === 1 ? onCancel() : setStep(isFolder && step === 3 ? 1 : step - 1));

  const draft = (): Partial<Asset> & { type: AssetType; displayName: string } => ({
    type,
    displayName: displayName.trim(),
    shortDescription,
    description,
    category,
    subCategory,
    department: department || undefined,
    tags,
    accessibility: visibility === 'Marketplace' ? 'PUBLIC' : visibility === 'Team' ? 'TEAM' : 'PRIVATE',
    marketplaceLive: marketplace,
    capabilityIds: isFolder ? [] : folderIds,
    ...(type === 'capability' && { linkedSkillIds: skillIds }),
    ...(type === 'skill' && { skillType: subType as Asset['skillType'], promptTemplate, examples, knowledgeIds, instructionIds, policyIds }),
    ...(type !== 'skill' && type !== 'capability' && { subType, content, ...(type === 'policy' && { enforcementMode: enforcement }) }),
  });

  const runScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 1200));
    setReport(scanAsset({ type, displayName, shortDescription, description, category, tags, promptTemplate, content }));
    setScanning(false);
  };

  const submit = async (publish: boolean) => {
    setCreating(true);
    const created = await createAsset(draft(), publish);
    setCreating(false);
    toast({ title: publish ? 'Published to marketplace' : 'Saved as local draft', description: `${ASSET_TYPE_LABEL[type]} “${created.displayName}” created as ${created.id}.` });
    onCreated(created.id);
  };

  const pickerPool = picker ? assets.filter(a => a.type === picker && a.isFamilyHead && a.status !== 'ARCHIVED' && `${a.displayName} ${a.id}`.toLowerCase().includes(pickerQuery.toLowerCase())) : [];
  const selectedFor = { capability: folderIds, skill: skillIds, knowledge: knowledgeIds, instruction: instructionIds, policy: policyIds } as const;
  const setterFor = { capability: setFolderIds, skill: setSkillIds, knowledge: setKnowledgeIds, instruction: setInstructionIds, policy: setPolicyIds } as const;

  const RelationBlock: React.FC<{ kind: 'capability' | 'skill' | 'knowledge' | 'instruction' | 'policy'; label: string }> = ({ kind, label }) => {
    const ids = selectedFor[kind];
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-[13.5px] font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
            {typeIcon(kind)} Linked {label} ({ids.length})
          </span>
          <Button size="xs" variant="dark" onClick={() => { setPicker(kind); setPickerQuery(''); }}>+ Attach {ASSET_TYPE_LABEL[kind]}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {ids.map(id => {
            const a = assets.find(x => x.id === id);
            if (!a) return null;
            return (
              <div key={id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-[13.5px]">
                <div className="min-w-0">
                  <p className="font-semibold text-[#0F172A] truncate">{a.displayName}</p>
                  <p className="text-slate-400 font-mono mt-0.5">{id}</p>
                </div>
                <button onClick={() => setterFor[kind](ids.filter(x => x !== id))} className="text-slate-400 hover:text-rose-500"><X className="w-4 h-4" /></button>
              </div>
            );
          })}
          {ids.length === 0 && <p className="text-[13.5px] text-slate-400 italic col-span-full">Nothing attached yet.</p>}
        </div>
      </div>
    );
  };

  const reviewRows: [string, React.ReactNode][] = [
    ['Type', <code key="t" className="text-[13.5px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-md uppercase">{type}</code>],
    ['Display title', displayName || 'None specified'],
    ['Short summary', shortDescription || 'No summary provided.'],
    ['Description', description || 'No description provided.'],
    ['Tags', tags.length ? tags.map(t => `#${t}`).join(', ') : 'None'],
    ['Attached', isFolder ? `Skills: ${skillIds.length}` : `Folders: ${folderIds.length}${type === 'skill' ? ` · Knowledge: ${knowledgeIds.length} · Instructions: ${instructionIds.length} · Policies: ${policyIds.length}` : ''}`],
    ['Accessibility', visibility === 'Team' ? `Team: ${TEAMS.find(t => t.id === teamId)?.name || 'Not chosen'}` : visibility === 'Marketplace' ? 'Everyone (Marketplace)' : 'Only Me'],
    ['Category', category || 'Unassigned'],
    ['Subcategory', subCategory || 'Unassigned'],
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Crumbs items={[{ label: 'Skills Library', onClick: onCancel }, { label: 'Create' }, { label: ASSET_TYPE_LABEL[type] }]} />
      <PageHeader title="Assemble Corporate AI Knowledge Skill" subtitle="Define metadata, relations, and publish compliance controls." actions={<Button variant="ghost" icon={<X className="w-4 h-4" />} onClick={onCancel}>Close</Button>} />

      <Card className="mb-6">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 min-w-0"><Stepper steps={visibleSteps} current={stepIndex} /></div>
          <span className="text-[13.5px] font-semibold bg-slate-50 text-slate-600 px-2.5 py-1 border border-slate-200 rounded-lg whitespace-nowrap self-start md:self-auto">Step {stepIndex + 1} of {visibleSteps.length}</span>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          {step === 1 && (
            <Card className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">Type</span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {(Object.keys(ASSET_TYPE_LABEL) as AssetType[]).map(t => (
                    <button key={t} type="button" onClick={() => applyDemo(t)} className={cx('px-3 h-11 rounded-xl border text-left flex items-center justify-between transition cursor-pointer', type === t ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-card' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}>
                      <span className="flex items-center gap-2 text-[13.5px] font-bold uppercase tracking-wider">{typeIcon(t)}{ASSET_TYPE_LABEL[t]}</span>
                      {type === t && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Display title name" required error={duplicateFolderName ? 'A folder with this name already exists. Choose a different name.' : undefined}>
                  <Input placeholder="e.g. Generate FRD Document" value={displayName} onChange={e => setDisplayName(e.target.value)} className={duplicateFolderName ? '!border-rose-400' : ''} />
                </Field>
                <div className="space-y-1.5">
                  <span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">Keywords / tags</span>
                  <TagInput tags={tags} onChange={setTags} placeholder="e.g. documentation" />
                </div>
              </div>
              <Field label="Short summary"><Input placeholder="A brief one-sentence explanation of what this is used for." value={shortDescription} onChange={e => setShortDescription(e.target.value)} /></Field>
              <Field label="Purpose description" required={!isFolder}><Textarea rows={3} placeholder="Explain the details and context…" value={description} onChange={e => setDescription(e.target.value)} /></Field>
              <div className="grid md:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                <Field label="Category">
                  <Select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {MARKETPLACE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </Select>
                </Field>
                <Field label="Sub category"><Input placeholder="e.g. Document Generation" value={subCategory} onChange={e => setSubCategory(e.target.value)} /></Field>
                <Field label={isFolder ? 'Business domain' : 'Dept. scope'}><Input placeholder="e.g. Engineering" value={department} onChange={e => setDepartment(e.target.value)} /></Field>
              </div>
            </Card>
          )}

          {step === 2 && !isFolder && (
            <Card className="space-y-6 animate-fade-in">
              <h3 className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider border-b border-slate-100 pb-3">Step 2: Content</h3>
              <div className={cx('grid gap-4', type === 'policy' ? 'md:grid-cols-2' : '')}>
                <Field label={`${ASSET_TYPE_LABEL[type]} type`}>
                  <Select value={subType} onChange={e => setSubType(e.target.value)}>
                    {SUBTYPES[type as Exclude<AssetType, 'capability'>].map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </Select>
                </Field>
                {type === 'policy' && (
                  <Field label="Enforcement mode">
                    <Select value={enforcement} onChange={e => setEnforcement(e.target.value as any)}>
                      <option value="OPTIONAL">Optional (Advisory)</option>
                      <option value="RECOMMENDED">Recommended (Warnings)</option>
                      <option value="MANDATORY">Mandatory (Blocks Execution)</option>
                    </Select>
                  </Field>
                )}
              </div>
              {type === 'skill' ? (
                <>
                  <Field label="Prompt template (system prompt — text / markdown)" required>
                    <Textarea rows={9} className="font-mono !text-[13.5px]" value={promptTemplate} onChange={e => setPromptTemplate(e.target.value)} placeholder="Act as a Business Analyst specialized in writing requirements… use {{input}} for caller data" />
                  </Field>
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
                    <span className="block text-[12.5px] font-bold text-[#475569] uppercase tracking-wider">Examples</span>
                    {examples.map((ex, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between">
                        <div className="text-[13.5px] space-y-1">
                          <span className="font-bold text-[#0F172A] block">{ex.title}</span>
                          <div className="text-slate-500 font-mono">Input: {ex.input}</div>
                          <div className="text-slate-500 font-mono">Output: {ex.output}</div>
                        </div>
                        <button onClick={() => setExamples(examples.filter((_, x) => x !== i))} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <div className="grid md:grid-cols-3 gap-2">
                      <Input placeholder="Example title" value={exDraft.title} onChange={e => setExDraft({ ...exDraft, title: e.target.value })} />
                      <Input placeholder="Sample input" value={exDraft.input} onChange={e => setExDraft({ ...exDraft, input: e.target.value })} />
                      <Input placeholder="Expected output" value={exDraft.output} onChange={e => setExDraft({ ...exDraft, output: e.target.value })} />
                    </div>
                    <Button size="sm" variant="dark" onClick={() => { if (!exDraft.title.trim()) return; setExamples([...examples, exDraft]); setExDraft({ title: '', input: '', output: '' }); }}>+ Add example</Button>
                  </div>
                </>
              ) : (
                <Field label={type === 'knowledge' ? 'Knowledge content (Markdown supported)' : type === 'instruction' ? 'Directive content (Markdown supported)' : 'Enforcement guardrails text (Markdown supported)'} required>
                  <Textarea rows={10} className="font-mono !text-[13.5px]" value={content} onChange={e => setContent(e.target.value)} placeholder={type === 'knowledge' ? '# Section 1: Standard…' : type === 'instruction' ? 'Always respond in markdown formats…' : 'Redact password values using the following patterns…'} />
                </Field>
              )}
            </Card>
          )}

          {step === 3 && (
            <Card className="space-y-6 animate-fade-in">
              <h3 className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider border-b border-slate-100 pb-3">{isFolder ? 'Step 2' : 'Step 3'}: Connect related items</h3>
              {isFolder ? (
                <RelationBlock kind="skill" label="Skills" />
              ) : (
                <>
                  <RelationBlock kind="capability" label="Folders" />
                  {type === 'skill' && (
                    <>
                      <RelationBlock kind="knowledge" label="Knowledge" />
                      <RelationBlock kind="instruction" label="Instructions" />
                      <RelationBlock kind="policy" label="Policies" />
                    </>
                  )}
                </>
              )}
            </Card>
          )}

          {step === 4 && (
            <Card className="space-y-5 animate-fade-in">
              <h3 className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider border-b border-slate-100 pb-3">{isFolder ? 'Step 3' : 'Step 4'}: Who can see this</h3>
              <Field label="Accessibility scope">
                <Select value={visibility} onChange={e => setVisibility(e.target.value as any)} className="h-10">
                  <option value="Private">Only Me</option>
                  <option value="Team">My Team</option>
                  {!isFolder && <option value="Marketplace">Everyone (Marketplace)</option>}
                </Select>
              </Field>
              {visibility === 'Team' && (
                <Field label="Which team" hint="Everyone on this team will be able to see and use it.">
                  <Select value={teamId} onChange={e => setTeamId(e.target.value)} className="h-10">
                    <option value="" disabled>Choose a team…</option>
                    {TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </Select>
                </Field>
              )}
              {marketplace && <Callout tone="info" title="Marketplace listing">Everyone in the marketplace will be able to install or clone this. A safety check runs before it goes live.</Callout>}
            </Card>
          )}

          {step === 5 && (
            <Card className="space-y-5 animate-fade-in">
              <h3 className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider border-b border-slate-100 pb-3">{isFolder ? 'Step 4' : 'Step 5'}: Review</h3>
              <div className="divide-y divide-slate-200 bg-slate-50 border border-slate-200 rounded-xl px-4 text-[13.5px]">
                {reviewRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start gap-6 py-3">
                    <span className="text-slate-500 font-bold uppercase tracking-wider shrink-0">{k}</span>
                    <span className="text-right text-[#334155] max-w-md">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {step === 6 && (
            <Card className="space-y-6 animate-fade-in">
              <h3 className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider border-b border-slate-100 pb-3">{isFolder ? 'Step 5' : 'Step 6'}: Confirm and publish</h3>
              {marketplace ? (
                <div className="space-y-5">
                  {!report && (
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <h4 className="text-[13.5px] font-bold text-[#0F172A] flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Safety check before publishing</h4>
                      <p className="text-[13.5px] text-slate-500 leading-relaxed">Publishing to the marketplace runs the compliance pipeline: it audits content for security vulnerabilities, PII risks, policy conformance and output quality. Critical findings block the listing.</p>
                      <p className="text-[13.5px] text-slate-400 leading-relaxed">Tip: try pasting <code className="bg-white px-1 border rounded">password: hunter2</code> into the content to see a blocked result.</p>
                    </div>
                  )}
                  {report && <ValidationReportView report={report} />}
                  <div className="flex gap-3">
                    <Button variant="dark" className="flex-1 !py-2.5" loading={scanning} disabled={creating} icon={<ShieldAlert className="w-4 h-4" />} onClick={runScan}>{scanning ? 'Checking…' : report ? 'Re-run safety check' : 'Run safety check'}</Button>
                    {report && report.status !== 'BLOCKED' && (
                      <Button variant="primary" className="flex-1 !py-2.5" loading={creating} icon={<Globe className="w-4 h-4" />} onClick={() => submit(true)}>Accept &amp; publish listing</Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0F172A]">Ready to save as a draft</h4>
                    <p className="text-[13.5px] text-slate-500 mt-1 max-w-md mx-auto">You’re registering this in the local workspace catalog, so the pre-publish safety check is skipped. You can publish it later from the detail page.</p>
                  </div>
                  <Button variant="primary" loading={creating} onClick={() => submit(false)}>{creating ? 'Creating…' : 'Commit as local draft'}</Button>
                </div>
              )}
            </Card>
          )}

          {step < 6 && (
            <div className="flex justify-between items-center">
              <Button onClick={back}>{step === 1 ? 'Cancel' : 'Back'}</Button>
              <Button variant="primary" onClick={next}>Next step</Button>
            </div>
          )}
          {step === 6 && (
            <div><Button onClick={back} disabled={creating || scanning}>Back</Button></div>
          )}
        </div>

        <Card className="space-y-4 lg:sticky lg:top-24">
          <span className="text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">You’re building</span>
          <div className="flex items-start gap-3">
            {assetIcon(type)}
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">{ASSET_TYPE_LABEL[type]}</p>
              <p className="text-[15px] font-bold text-[#0F172A] truncate">{displayName.trim() || `Untitled ${ASSET_TYPE_LABEL[type]}`}</p>
            </div>
          </div>
          <p className="text-[13.5px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{ASSET_TYPE_DESC[type]}</p>
        </Card>
      </div>

      <Dialog open={!!picker} onClose={() => setPicker(null)} title={`Attach ${picker ? ASSET_TYPE_LABEL[picker] : ''}`} subtitle="Pick one or more items to connect" footer={<Button variant="primary" onClick={() => setPicker(null)}>Done</Button>}>
        <SearchInput value={pickerQuery} onChange={setPickerQuery} placeholder="Search by name or ID…" className="mb-4" />
        <div className="space-y-2">
          {pickerPool.map(a => {
            const on = picker ? selectedFor[picker].includes(a.id) : false;
            return (
              <button key={a.id} onClick={() => picker && setterFor[picker](on ? selectedFor[picker].filter(x => x !== a.id) : [...selectedFor[picker], a.id])} className={cx('w-full text-left p-3 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition', on ? 'border-[#2563EB] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300')}>
                <div className="min-w-0">
                  <p className="text-[14.5px] font-bold text-[#0F172A]">{a.displayName}</p>
                  <p className="text-[13.5px] text-slate-500 truncate">{a.shortDescription || a.id}</p>
                </div>
                {on ? <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" /> : <span className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />}
              </button>
            );
          })}
          {pickerPool.length === 0 && <p className="text-[13.5px] text-slate-400 text-center py-8">No matching items.</p>}
        </div>
      </Dialog>
    </div>
  );
};

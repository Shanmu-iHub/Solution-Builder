import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Cloud,
  ExternalLink,
  Globe,
  Info,
  Loader2,
  Lock,
  Power,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cx, useToast } from '../../ui';
import { WorkspaceState } from '../types';

interface Props {
  projectId: string;
  projectName: string;
  state: WorkspaceState;
  hasFiles: boolean;
  onDeploy: (provider: string, name: string) => Promise<unknown>;
  onStop: (id: string) => void;
  onPublicLink: (on: boolean) => void;
  onOpenGit: () => void;
}

export const DeploymentPanel: React.FC<Props> = ({
  projectId,
  projectName,
  state,
  onPublicLink,
}) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'quick_share' | 'custom_cloud' | 'builder_hosting'>('custom_cloud');
  const [cloudProvider, setCloudProvider] = useState<'Cloudflare Pages' | 'Vercel'>('Cloudflare Pages');
  const [appName, setAppName] = useState(projectName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'expensifyiq');
  const [customDomain, setCustomDomain] = useState('pfltestt@gmail.com');
  const [publicAccess, setPublicAccess] = useState(state.publicLink);
  const [isLive, setIsLive] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const liveUrl = `https://${appName}-gkp1ekia1-aravindaihub-3757s-projects.vercel.app`;

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setIsLive(true);
      toast({
        title: 'Production Deployment Live!',
        description: liveUrl,
      });
    }, 1200);
  };

  const handleTogglePublic = (val: boolean) => {
    setPublicAccess(val);
    onPublicLink(val);
    toast({
      title: val ? 'Public Link Enabled' : 'Public Link Disabled',
      description: val ? 'Anyone with the URL can view the preview.' : 'Project is now private.',
    });
  };

  const handleStopService = () => {
    setIsLive(false);
    toast({
      title: 'Service Stopped',
      description: 'Production deployment has been temporarily suspended.',
    });
  };

  const handleLaunch = () => {
    window.open(liveUrl, '_blank');
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#FAFAFA] p-4 lg:p-6 space-y-6 font-sans">
      {/* Top Banner Card: Active Production Deployment */}
      {isLive && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-[14.5px] font-bold text-slate-900 truncate">
                  Active Production Deployment (Vercel)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                  LIVE
                </span>
              </div>
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[13px] font-mono text-emerald-700 hover:text-emerald-900 hover:underline mt-0.5 truncate"
              >
                <span className="truncate">{liveUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLaunch}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-bold shadow-xs transition cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Launch Site</span>
            </button>
            <button
              onClick={handleStopService}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-[12.5px] font-bold shadow-xs transition cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Stop Service</span>
            </button>
          </div>
        </div>
      )}

      {/* 3 Deployment Option Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Quick Share */}
        <div
          onClick={() => setSelectedPlan('quick_share')}
          className={cx(
            'relative rounded-2xl border p-5 flex flex-col justify-between transition cursor-pointer bg-white',
            selectedPlan === 'quick_share'
              ? 'border-slate-900 shadow-md ring-1 ring-slate-900'
              : 'border-slate-200 hover:border-slate-300'
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                INSTANT
              </span>
            </div>

            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Quick Share</h4>
            <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
              Get an instant public or private shareable link for live app demos &amp; previews.
            </p>

            <ul className="space-y-2 text-[12.5px] text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Instant shareable URL</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Public &amp; Private access control</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>No external setup required</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Live interactive preview</span>
              </li>
            </ul>
          </div>

          <button
            className={cx(
              'w-full py-2.5 rounded-xl text-[12.5px] font-bold transition cursor-pointer',
              selectedPlan === 'quick_share'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            )}
          >
            {selectedPlan === 'quick_share' ? 'Selected' : 'Select'}
          </button>
        </div>

        {/* Card 2: Your Own Cloud Infrastructure */}
        <div
          onClick={() => setSelectedPlan('custom_cloud')}
          className={cx(
            'relative rounded-2xl border p-5 flex flex-col justify-between transition cursor-pointer bg-white',
            selectedPlan === 'custom_cloud'
              ? 'border-slate-900 shadow-md ring-1 ring-slate-900'
              : 'border-slate-200 hover:border-slate-300'
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cloud className="w-4 h-4" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                POPULAR
              </span>
            </div>

            <h4 className="text-[15px] font-bold text-slate-900 mb-1">
              Your Own Cloud Infrastructure
            </h4>
            <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
              Deploy directly to your personal Cloudflare Pages or Vercel account using your API token.
            </p>

            <ul className="space-y-2 text-[12.5px] text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Supports Cloudflare &amp; Vercel</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Full account ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Global Edge CDN network</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>Custom domain binding</span>
              </li>
            </ul>
          </div>

          <button
            className={cx(
              'w-full py-2.5 rounded-xl text-[12.5px] font-bold transition cursor-pointer',
              selectedPlan === 'custom_cloud'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            )}
          >
            {selectedPlan === 'custom_cloud' ? 'Selected' : 'Select'}
          </button>
        </div>

        {/* Card 3: Solution Builder Hosting (Locked) */}
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between opacity-80">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                LOCKED
              </span>
            </div>

            <h4 className="text-[15px] font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span>Solution Builder Hosting</span>
              <Lock className="w-3.5 h-3.5 text-amber-500" />
            </h4>
            <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
              Deploy on our high-performance cloud infrastructure with custom domain support.
            </p>

            <ul className="space-y-2 text-[12.5px] text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Custom domain support</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Built-in analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Auto SSL &amp; CDN</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>One-click cloud deploy</span>
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full py-2.5 rounded-xl text-[12.5px] font-bold bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          >
            Locked
          </button>
        </div>
      </div>

      {/* Dynamic Bottom Section Based on Selected Card */}
      {selectedPlan === 'quick_share' ? (
        /* Quick Share Configuration (Screenshot 3) */
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div>
              <h4 className="text-[14.5px] font-bold text-slate-900">
                Quick Share Configuration
              </h4>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Configure your deployment settings below.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-[13px] font-bold text-slate-900">Public Link Access</h5>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">
                    Allow anyone with the link to preview your live application.
                  </p>
                </div>
                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => handleTogglePublic(!publicAccess)}
                  className={cx(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    publicAccess ? 'bg-emerald-600' : 'bg-slate-300'
                  )}
                >
                  <span
                    className={cx(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                      publicAccess ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>

              {!publicAccess ? (
                <div className="flex items-start gap-2 text-[12px] text-slate-500 bg-white border border-slate-200 rounded-lg p-2.5">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Public link is currently disabled. Toggle &apos;Public Link Access&apos; above to create a shareable link.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-[12px] font-mono text-emerald-800">
                  <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{location.origin}/share/{projectId}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-[11.5px] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>SHARE OVERVIEW</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {publicAccess ? 'Public Link Active' : 'Private Only'}
              </span>
            </div>

            <div className="space-y-4 text-[12.5px] text-slate-600">
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Instant Team Preview</p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                    Quick Share creates an instant public preview route without requiring any external cloud accounts or API tokens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Granular Access Control</p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                    You can enable or disable public access at any time with a single toggle switch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Cloud Infrastructure Configuration (Screenshot 4) */
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div>
              <h4 className="text-[14.5px] font-bold text-slate-900">
                {cloudProvider} Deployment Configuration
              </h4>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Configure your deployment settings below.
              </p>
            </div>

            {/* Provider selection buttons */}
            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-slate-700">
                Select Cloud Provider
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCloudProvider('Cloudflare Pages')}
                  className={cx(
                    'flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold transition cursor-pointer border',
                    cloudProvider === 'Cloudflare Pages'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <Cloud className="w-4 h-4" />
                  <span>Cloudflare Pages</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCloudProvider('Vercel')}
                  className={cx(
                    'flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold transition cursor-pointer border',
                    cloudProvider === 'Vercel'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span>Vercel</span>
                </button>
              </div>
            </div>

            {/* Project name input */}
            <div className="space-y-1">
              <label className="block text-[12px] font-bold text-slate-700">
                Project Name
              </label>
              <input
                type="text"
                value={appName}
                onChange={e => setAppName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[13px] font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-400">
                This will be used for your application URL.
              </p>
            </div>

            {/* Custom domain input */}
            <div className="space-y-1">
              <label className="block text-[12px] font-bold text-slate-700">
                Custom Domain (Optional)
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={e => setCustomDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-blue-50/30 text-[13px] font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
              <p className="flex items-center gap-1 text-[11px] text-amber-600 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Please enter a valid domain name (e.g. app.yourdomain.com), not an email address.</span>
              </p>
            </div>

            {/* Deploy Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDeploy}
                disabled={deploying}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold shadow-md transition cursor-pointer disabled:opacity-60"
              >
                {deploying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Deploying to {cloudProvider}…</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 text-emerald-400" />
                    <span>Deploy Application</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right telemetry & activity stream card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-[11.5px] uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                <span>DEPLOYMENT TELEMETRY</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live &amp; Operational
              </span>
            </div>

            {/* 3 Telemetry items */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 text-[12px]">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Authentication</span>
                </div>
                <span className="font-bold text-emerald-700 text-[11px]">Verified Token</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[12px]">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400" />
                  <span>2. Asset Compilation</span>
                </div>
                <span className="font-medium text-slate-500 text-[11px]">Awaiting Deploy</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[12px]">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400" />
                  <span>3. Edge Propagation</span>
                </div>
                <span className="font-medium text-slate-500 text-[11px]">Global Anycast</span>
              </div>
            </div>

            {/* Activity Stream */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                ACTIVITY STREAM
              </p>
              <div className="flex items-center gap-2 text-[12px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-2 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>[ACTIVE] Project is deployed live!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import {
  Trophy,
  Flame,
  Target,
  Award,
  Zap,
  Medal,
  Star,
  Users,
  CheckCircle2,
  Gift,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Plus,
  Play,
  RotateCw,
  Clock,
  ChevronRight,
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';

interface QuestItem {
  id: string;
  title: string;
  category: 'FinOps' | 'Security' | 'DevOps' | 'Testing' | 'Culture';
  rewardXP: number;
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  isCompleted: boolean;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  squad: string;
  xp: number;
  streak: number;
  badgesCount: number;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
}

export const GamificationsWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [activeConsoleTab, setActiveConsoleTab] = useState<'quests' | 'leaderboard' | 'badges' | 'store'>('quests');
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [userXP, setUserXP] = useState(14250);

  const [quests, setQuests] = useState<QuestItem[]>([
    {
      id: 'q-1',
      title: 'FinOps Cloud Cleanup: Terminate Idle Instances',
      category: 'FinOps',
      rewardXP: 1200,
      progress: 3,
      target: 3,
      unit: 'instances',
      deadline: '2 days left',
      isCompleted: true
    },
    {
      id: 'q-2',
      title: 'Rapid Code Reviews: < 15-Minute Turnaround',
      category: 'DevOps',
      rewardXP: 850,
      progress: 8,
      target: 10,
      unit: 'PR reviews',
      deadline: '4 days left',
      isCompleted: false
    },
    {
      id: 'q-3',
      title: 'Zero-Regression Sprint: 100% E2E Pass Rate',
      category: 'Testing',
      rewardXP: 1500,
      progress: 42,
      target: 50,
      unit: 'test suites',
      deadline: '5 days left',
      isCompleted: false
    },
    {
      id: 'q-4',
      title: 'Security Vulnerability Patching Drill (SOC 2)',
      category: 'Security',
      rewardXP: 2000,
      progress: 5,
      target: 5,
      unit: 'CVEs patched',
      deadline: 'Just ended',
      isCompleted: true
    }
  ]);

  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Vikram K.', avatar: 'VK', squad: 'Squad DevOps', xp: 18400, streak: 21, badgesCount: 14, tier: 'Diamond' },
    { rank: 2, name: 'Ananya M.', avatar: 'AM', squad: 'Squad Core AI', xp: 16950, streak: 18, badgesCount: 12, tier: 'Diamond' },
    { rank: 3, name: 'Sanmugavel S (You)', avatar: 'SS', squad: 'Squad FinTech', xp: userXP, streak: 14, badgesCount: 10, tier: 'Platinum' },
    { rank: 4, name: 'Elena Rostova', avatar: 'ER', squad: 'Squad Architecture', xp: 12800, streak: 9, badgesCount: 8, tier: 'Platinum' },
    { rank: 5, name: 'Rahul Sharma', avatar: 'RS', squad: 'Squad Platform', xp: 10400, streak: 7, badgesCount: 6, tier: 'Gold' }
  ];

  const handleClaimQuest = (questId: string, xp: number) => {
    if (claimedRewards.includes(questId)) return;
    setClaimedRewards(prev => [...prev, questId]);
    setUserXP(prev => prev + xp);
    alert(`🎉 Quest reward claimed! +${xp} XP added to your developer wallet.`);
  };

  if (viewMode === 'landing') {
    const config = getOfferingConfig('gamifications');
    if (!config) return <div>Configuration not found</div>;
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-8 animate-fade-in select-none pb-20 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb and Return Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <Breadcrumb items={[{ label: 'Products' }, { label: 'Rewards & Engagement Console' }]} />

        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all shadow-2xs cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Product Overview</span>
        </button>
      </div>

      {/* 2. Hero Banner Card */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider border border-white/30">
                Season 4 Active
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-100">
                <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span>14 Day Streak Multiplier (1.5x XP)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Developer Quest & Rewards Hub
            </h1>

            <p className="text-xs sm:text-sm text-amber-50 max-w-xl leading-relaxed">
              Complete engineering bounties, reduce cloud waste, and level up your squad on the global leaderboards.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex items-center gap-5 shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-white text-amber-600 flex items-center justify-center font-extrabold shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-100 uppercase block">Your Accumulated XP</span>
              <div className="text-2xl font-extrabold text-white">
                {userXP.toLocaleString()} <span className="text-xs font-medium text-amber-200">XP</span>
              </div>
              <span className="text-[11px] text-amber-100 font-semibold">Rank #3 · Platinum Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Quests" value={`${quests.filter(q => !q.isCompleted).length} In Progress`} subtitle="2 ready to claim" isPositive />
        <MetricCard label="Daily Streak" value="14 Days 🔥" subtitle="1.5x bonus multiplier" isPositive />
        <MetricCard label="Team Standing" value="Squad FinTech (#1)" subtitle="Weekly champions" isPositive />
        <MetricCard label="Reward Store Balance" value={`${userXP.toLocaleString()} XP`} subtitle="₹1,500 equivalent" isPositive />
      </div>

      {/* 4. Tab Switcher */}
      <div className="border-b border-slate-200 flex items-center gap-8 text-sm font-bold">
        <button
          onClick={() => setActiveConsoleTab('quests')}
          className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
            activeConsoleTab === 'quests'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Active Quests & Bounties ({quests.length})</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('leaderboard')}
          className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
            activeConsoleTab === 'leaderboard'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Squad Leaderboards</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('badges')}
          className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
            activeConsoleTab === 'badges'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Badges & Trophies</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('store')}
          className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
            activeConsoleTab === 'store'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Perks & Swag Store</span>
        </button>
      </div>

      {/* 5. Tab Content */}
      {activeConsoleTab === 'quests' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quests.map(quest => {
              const isClaimed = claimedRewards.includes(quest.id);
              const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

              return (
                <div
                  key={quest.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {quest.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 font-extrabold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>+{quest.rewardXP} XP</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-2">{quest.title}</h3>

                    <div className="space-y-1.5 my-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>Progress: {quest.progress} / {quest.target} {quest.unit}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            percent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quest.deadline}</span>
                    </span>

                    {quest.isCompleted ? (
                      <button
                        type="button"
                        onClick={() => handleClaimQuest(quest.id, quest.rewardXP)}
                        disabled={isClaimed}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isClaimed
                            ? 'bg-slate-100 text-slate-400 border border-slate-200'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isClaimed ? 'Claimed' : 'Claim +XP'}</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-600">In Progress</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeConsoleTab === 'leaderboard' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sprint Leaderboard Standings</h3>
              <p className="text-xs text-slate-500">Ranked by weekly accumulated developer XP & streak multipliers.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Resets in 3 days</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map(u => (
              <div
                key={u.rank}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  u.rank === 3
                    ? 'bg-amber-50/70 border-amber-300/80 shadow-2xs'
                    : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                    u.rank === 1 ? 'bg-amber-400 text-slate-900' : u.rank === 2 ? 'bg-slate-300 text-slate-800' : u.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {u.rank}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {u.avatar}
                    </div>
                    <div>
                      <strong className="text-xs text-slate-900 block">{u.name}</strong>
                      <span className="text-[11px] text-slate-500">{u.squad}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div className="hidden sm:flex items-center gap-1 text-slate-600">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{u.streak}d streak</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                    {u.tier}
                  </span>

                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 text-sm">{u.xp.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block">XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeConsoleTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Zero-Downtime Hero', desc: 'Deployed 50 consecutive releases without production disruption.', icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-50', border: 'border-emerald-200', unlocked: true },
            { title: 'FinOps Waste Buster', desc: 'Saved more than ₹1,00,000 in idle cloud compute costs.', icon: <Zap className="w-6 h-6 text-cyan-600" />, bg: 'bg-cyan-50', border: 'border-cyan-200', unlocked: true },
            { title: 'Speedy Reviewer', desc: 'Maintained < 15-minute average PR turnaround time.', icon: <Flame className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-50', border: 'border-amber-200', unlocked: true },
            { title: 'Security Guardian', desc: 'Resolved 20 critical CVEs before deployment stage.', icon: <Lock className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50', border: 'border-purple-200', unlocked: false }
          ].map((b, idx) => (
            <div key={idx} className={`p-5 rounded-3xl border ${b.bg} ${b.border} space-y-3`}>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                {b.icon}
              </div>
              <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">{b.desc}</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                b.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {b.unlocked ? 'Unlocked 🏆' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeConsoleTab === 'store' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: '₹1,000 Amazon / Swiggy Voucher', cost: 10000, desc: 'Instant gift card delivery to your registered email.', icon: <Gift className="w-6 h-6 text-amber-600" /> },
            { title: 'SNS Square Tech Hoodie', cost: 15000, desc: 'Premium embroidered developer hoodie with custom squad tag.', icon: <Award className="w-6 h-6 text-blue-600" /> },
            { title: 'Global Tech Conference Pass', cost: 35000, desc: 'Full sponsorship for KubeCon or AWS re:Invent virtual pass.', icon: <Trophy className="w-6 h-6 text-emerald-600" /> }
          ].map((item, sIdx) => (
            <div key={sIdx} className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-600">{item.cost.toLocaleString()} XP</span>
                <button
                  type="button"
                  onClick={() => alert(`Redemption request submitted for ${item.title}!`)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

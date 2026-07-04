import { useEffect, useState } from 'react';
import { FolderKanban, BookOpen, MessageSquare, Wrench, Briefcase, Eye } from 'lucide-react';
import client from '../api/client.js';

const statCards = [
  { key: 'projects', label: 'Projects', icon: FolderKanban, color: 'indigo' },
  { key: 'blogs', label: 'Blog Posts', icon: BookOpen, color: 'violet' },
  { key: 'messages', label: 'Messages', icon: MessageSquare, color: 'cyan' },
  { key: 'skills', label: 'Skills', icon: Wrench, color: 'emerald' },
  { key: 'experience', label: 'Experience', icon: Briefcase, color: 'orange' },
  { key: 'views', label: 'Total Views', icon: Eye, color: 'pink' },
];

const colorMap = {
  indigo: { bg: 'bg-indigo-500/10', ring: 'ring-indigo-500/20', text: 'text-indigo-400', glow: 'shadow-[0_0_20px_rgba(99,102,241,0.1)]' },
  violet: { bg: 'bg-violet-500/10', ring: 'ring-violet-500/20', text: 'text-violet-400', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.1)]' },
  cyan: { bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]' },
  emerald: { bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]' },
  orange: { bg: 'bg-orange-500/10', ring: 'ring-orange-500/20', text: 'text-orange-400', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.1)]' },
  pink: { bg: 'bg-pink-500/10', ring: 'ring-pink-500/20', text: 'text-pink-400', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.1)]' },
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/dashboard')
      .then(({ data }) => setStats(data.data))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map(({ key, label, icon: Icon, color }) => {
          const c = colorMap[color];
          return (
            <div
              key={key}
              className={`bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 ${c.glow} hover:border-white/[0.12] transition-all`}
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center mb-4`}>
                <Icon size={18} className={c.text} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {loading ? (
                  <div className="w-8 h-7 bg-white/[0.06] rounded animate-pulse" />
                ) : (
                  stats?.[key] ?? '—'
                )}
              </div>
              <div className="text-xs text-zinc-500">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

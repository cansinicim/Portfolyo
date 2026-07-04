import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const palette = [
  { accent: 'from-violet-500 via-indigo-500 to-transparent', dot: 'bg-violet-500', glow: 'rgba(139,92,246,0.18)', glowStrong: 'rgba(139,92,246,0.38)' },
  { accent: 'from-cyan-500 via-blue-500 to-transparent', dot: 'bg-cyan-400', glow: 'rgba(34,211,238,0.16)', glowStrong: 'rgba(34,211,238,0.34)' },
  { accent: 'from-amber-500 via-orange-500 to-transparent', dot: 'bg-amber-400', glow: 'rgba(245,158,11,0.16)', glowStrong: 'rgba(245,158,11,0.34)' },
  { accent: 'from-emerald-500 via-teal-500 to-transparent', dot: 'bg-emerald-400', glow: 'rgba(52,211,153,0.16)', glowStrong: 'rgba(52,211,153,0.34)' },
  { accent: 'from-rose-500 via-fuchsia-500 to-transparent', dot: 'bg-rose-400', glow: 'rgba(244,63,94,0.16)', glowStrong: 'rgba(244,63,94,0.34)' },
  { accent: 'from-indigo-500 via-violet-500 to-transparent', dot: 'bg-indigo-400', glow: 'rgba(99,102,241,0.18)', glowStrong: 'rgba(99,102,241,0.38)' },
];

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectCard({ project, index }) {
  const { accent, dot, glow, glowStrong } = palette[index % palette.length];

  return (
    <motion.article
      variants={item}
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 20px 40px -20px ${glow}` }}
      whileHover={{ y: -6, boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 24px 50px -18px ${glowStrong}` }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Card header with gradient accent */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent} opacity-80`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dot} shadow-sm`} />
            <h3 className="text-base font-semibold text-white leading-snug">
              {project.title}
            </h3>
          </div>
          {/* Links */}
          <div className="flex items-center gap-1 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="Live demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(project.technologies || []).map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

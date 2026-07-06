import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectCard({ project }) {
  return (
    <motion.div variants={item} className="glass-panel flex flex-col group h-full card-hover">
      <div className="aspect-video relative overflow-hidden bg-surface-container">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderGit2 size={40} className="text-outline-variant" />
          </div>
        )}
        <div className="absolute inset-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4 gap-3">
          <h3 className="font-bold text-primary text-xl">{project.title}</h3>
          {project.isFeatured && (
            <span className="font-mono text-[10px] text-primary-container border border-primary-container px-2 py-0.5 flicker-neon shrink-0">
              FEATURED
            </span>
          )}
        </div>
        <p className="text-on-surface-variant mb-6 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.technologies || []).map((tech) => (
            <span key={tech} className="font-mono text-xs opacity-50 text-on-surface">[{tech.toUpperCase()}]</span>
          ))}
        </div>
        <div className="flex gap-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-primary-container flex items-center gap-2 hover:text-primary transition-colors"
            >
              &gt; VIEW_SOURCE
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-primary-container flex items-center gap-2 hover:text-primary transition-colors"
            >
              &gt; LIVE_DEMO
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard.jsx';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Projects({ projects, loading, viewSourceUrl }) {
  return (
    <section className="py-24 bg-surface-container-lowest/50 backdrop-blur-sm" id="work">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4 flex items-center gap-4">
              <span className="text-primary-container font-mono">[02]</span> Active Repositories
            </h2>
            <p className="font-mono text-on-surface-variant max-w-lg text-sm">
              Selected artifacts from various technical missions. Focused on performance, DX, and user interface integrity.
            </p>
          </div>
          {viewSourceUrl && (
            <a
              href={viewSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-primary-container flex items-center gap-2 hover:translate-x-2 transition-transform duration-300 active:scale-95 shrink-0"
            >
              ls -a /projects <ArrowRight size={16} />
            </a>
          )}
        </motion.div>

        {!loading && projects.length === 0 ? (
          <div className="text-center py-20 font-mono text-on-surface-variant opacity-60">// No repositories deployed yet.</div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

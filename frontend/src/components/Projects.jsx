import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Projects({ projects, loading }) {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase">Projects</span>
            <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent max-w-24" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text leading-tight">
            Things I've built.
          </h2>
        </motion.div>

        {/* Cards grid */}
        {!loading && projects.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">No projects added yet.</div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const categoryLabels = {
  frontend: 'FRONTEND',
  backend: 'BACKEND',
  devops: 'DEVOPS',
  other: 'OTHER',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export default function About({ profile, skills, experience }) {
  const grouped = skills.reduce((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});
  const categories = Object.keys(categoryLabels).filter((c) => grouped[c]?.length);

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto" id="about">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-12 flex items-center gap-4">
          <span className="text-primary-container font-mono">[01]</span> System Logs
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {profile?.about && (
              <motion.div variants={fadeUp} className="glass-panel p-6 border-l-4 border-l-primary-container">
                <p className="font-mono text-primary mb-2 text-xs tracking-[0.1em] uppercase">LOG_INIT: BACKSTORY</p>
                <p className="text-on-surface-variant">{profile.about}</p>
              </motion.div>
            )}

            {categories.length > 0 && (
              <motion.div variants={fadeUp} className="glass-panel p-6 border-l-4 border-l-secondary">
                <p className="font-mono text-primary mb-3 text-xs tracking-[0.1em] uppercase">LOG_STATUS: CURRENT_STACK</p>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat}>
                      <p className="font-mono text-[10px] text-on-surface-variant opacity-50 mb-1.5">// {categoryLabels[cat]}</p>
                      <div className="flex flex-wrap gap-2">
                        {grouped[cat].map((skill) => (
                          <span key={skill._id} className="bg-surface-container px-3 py-1 text-xs font-mono border border-outline-variant/30 text-on-surface">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {experience.length > 0 && (
              <motion.div variants={fadeUp} className="glass-panel p-6 border-l-4 border-l-primary-container">
                <p className="font-mono text-primary mb-3 text-xs tracking-[0.1em] uppercase">LOG_HISTORY: CAREER_PATH</p>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp._id} className="font-mono text-xs">
                      <p className="text-on-surface">
                        <span className="text-primary-container">$</span> {exp.position} <span className="text-on-surface-variant opacity-60">@ {exp.company}</span>
                      </p>
                      <p className="text-on-surface-variant opacity-50 mt-0.5">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                      {exp.description && (
                        <p className="text-on-surface-variant mt-1.5 font-sans">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary-container/10 blur-xl group-hover:bg-primary-container/20 transition-all duration-700 rounded-full" />
            <div className="relative aspect-square overflow-hidden rounded-lg border border-outline-variant/30">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                  <User size={64} className="text-outline-variant" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 font-mono text-xs text-primary-container bg-background/80 px-4 py-2 backdrop-blur-md border border-primary-container/50">
                ID_0492: HUMAN_INTERFACE_UNIT
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

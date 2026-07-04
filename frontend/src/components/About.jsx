import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

export default function About({ profile, skills }) {
  const stackPreview = skills.slice(0, 12);

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase">About</span>
          <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent max-w-24" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 gradient-text leading-tight">
              Crafting software<br />with intention.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed mb-8">
              {profile?.about || 'Add an "about" section from the admin panel.'}
            </motion.p>

            {/* Meta info */}
            {(profile?.location || profile?.email) && (
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                {profile?.location && (
                  <div className="inline-flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin size={14} className="text-violet-400" />
                    {profile.location}
                  </div>
                )}
                {profile?.email && (
                  <div className="inline-flex items-center gap-2 text-sm text-zinc-400">
                    <Mail size={14} className="text-cyan-400" />
                    {profile.email}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right: tech stack grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
              Technologies I work with
            </p>
            {stackPreview.length === 0 ? (
              <p className="text-sm text-zinc-600">No skills added yet.</p>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {stackPreview.map((skill) => (
                  <motion.span key={skill._id} variants={tagItem} className="tech-tag">
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Values / what I do */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {[
                { title: 'Clean Code', desc: 'Readable, maintainable, and well-structured.' },
                { title: 'Performance', desc: 'Fast by default, optimized where it matters.' },
                { title: 'UI/UX Focus', desc: 'Interfaces that feel intuitive and polished.' },
                { title: 'Open Source', desc: 'Give back to the community that built me.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={tagItem}
                  whileHover={{ y: -3 }}
                  className="glass rounded-xl p-4 transition-colors hover:border-white/15"
                >
                  <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-zinc-500 leading-relaxed">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

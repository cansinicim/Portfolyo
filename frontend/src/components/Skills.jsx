import { motion } from 'framer-motion';

const categoryConfig = {
  frontend: {
    label: 'Frontend',
    desc: 'UI development & design systems',
    color: 'from-violet-500/20 to-indigo-500/20',
    dot: 'bg-violet-400',
    ring: 'ring-violet-500/20',
    bar: 'from-violet-500 to-indigo-400',
  },
  backend: {
    label: 'Backend',
    desc: 'APIs, databases & server logic',
    color: 'from-cyan-500/20 to-blue-500/20',
    dot: 'bg-cyan-400',
    ring: 'ring-cyan-500/20',
    bar: 'from-cyan-500 to-teal-400',
  },
  devops: {
    label: 'DevOps',
    desc: 'Infrastructure & deployment',
    color: 'from-amber-500/20 to-orange-500/20',
    dot: 'bg-amber-400',
    ring: 'ring-amber-500/20',
    bar: 'from-amber-500 to-orange-400',
  },
  other: {
    label: 'Other',
    desc: 'Additional tools & skills',
    color: 'from-zinc-500/20 to-zinc-400/20',
    dot: 'bg-zinc-400',
    ring: 'ring-zinc-500/20',
    bar: 'from-zinc-400 to-zinc-300',
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills({ skills }) {
  const grouped = skills.reduce((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});
  const categories = Object.keys(categoryConfig).filter((c) => grouped[c]?.length);

  return (
    <section id="skills" className="py-28 px-6 relative">
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
            <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">Skills</span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent max-w-24" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text leading-tight">
            My toolkit.
          </h2>
        </motion.div>

        {categories.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">No skills added yet.</div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {categories.map((category) => {
              const cfg = categoryConfig[category];
              const items = grouped[category];
              return (
                <motion.div
                  key={category}
                  variants={cardItem}
                  whileHover={{ y: -4 }}
                  className={`glass rounded-2xl p-6 ring-1 ${cfg.ring} transition-shadow hover:shadow-xl hover:shadow-black/20`}
                >
                  {/* Column header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center ring-1 ${cfg.ring}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{cfg.label}</div>
                      <div className="text-xs text-zinc-500">{cfg.desc}</div>
                    </div>
                  </div>

                  {/* Skill bars */}
                  <div className="space-y-3.5">
                    {items.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-zinc-300">{skill.name}</span>
                          <span className="text-[10px] text-zinc-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.bar}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

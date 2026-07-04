import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile }) {
  const name = profile?.fullName || 'Your Name';
  const title = profile?.title || 'Add your title from the admin panel';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Focal glow behind the name */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.32) 0%, rgba(34,211,238,0.16) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Avatar */}
        {profile?.profileImage && (
          <motion.div variants={item} className="flex justify-center mb-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400">
              <img
                src={profile.profileImage}
                alt={name}
                className="w-full h-full rounded-full object-cover border-2 border-[#050507]"
              />
            </div>
          </motion.div>
        )}

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4"
        >
          <span className="name-gradient">{name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={item}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5"
        >
          <span className="accent-text">{title}</span>
        </motion.p>

        {/* Tagline */}
        {profile?.about && (
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10"
          >
            {profile.about}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-[length:200%_100%] hover:bg-right btn-glow transition-[background-position] duration-500"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          {profile?.cvUrl && (
            <motion.a
              href={profile.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-300 glass hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-colors"
            >
              <Download size={15} />
              Resume
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-zinc-500" />
      </motion.div>
    </section>
  );
}

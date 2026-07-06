import { motion } from 'framer-motion';
import { Terminal, ChevronsDown } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, viewSourceUrl }) {
  const name = profile?.fullName || 'guest';
  const title = profile?.title || 'Add your title from the admin panel';

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        className="relative z-20 w-full max-w-3xl px-margin-mobile"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="glass-panel rounded-lg overflow-hidden shadow-2xl border border-outline-variant/50 relative">
          <div className="terminal-header flex items-center justify-between px-4 py-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="font-mono text-xs text-on-surface-variant opacity-60">guest@terminal-dev: ~</div>
          </div>

          <div className="p-8 font-mono text-sm">
            <div className="mb-4">
              <span className="text-primary-container">sudo</span>{' '}
              <span className="text-secondary">guest:</span>
              <span className="text-on-surface">~$ whoami</span>
            </div>
            <div className="mb-6 text-on-surface-variant">
              &gt; <span className="text-primary blinking-cursor">{name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-primary mb-6">
              {title}
            </h1>

            {profile?.about && (
              <div className="mb-8 text-on-surface-variant max-w-xl">
                {profile.about}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary-container text-on-primary-container px-8 py-4 font-mono text-xs tracking-[0.1em] uppercase font-bold glow-hover transition-all flex items-center justify-center gap-2"
              >
                <Terminal size={16} />
                Execute_Journey
              </motion.a>
              {viewSourceUrl && (
                <motion.a
                  href={viewSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-primary-container text-primary-container px-8 py-4 font-mono text-xs tracking-[0.1em] uppercase font-bold hover:bg-primary-container/10 transition-all flex items-center justify-center gap-2"
                >
                  View_Source
                </motion.a>
              )}
            </div>
          </div>

          <div className="scanline" />
        </motion.div>

        <motion.div variants={item} className="mt-8 flex justify-center opacity-50">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronsDown className="text-primary-container" size={22} />
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}

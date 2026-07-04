import { motion } from 'framer-motion';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-white/[0.06] py-8 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
        <span>
          &copy; {year} <span className="text-zinc-400 font-medium">{profile?.fullName || 'Portfolyo'}</span>. All rights reserved.
        </span>
        <span>
          Built with{' '}
          <span className="text-zinc-400">React</span> &{' '}
          <span className="text-zinc-400">Tailwind CSS</span>
        </span>
      </div>
    </motion.footer>
  );
}

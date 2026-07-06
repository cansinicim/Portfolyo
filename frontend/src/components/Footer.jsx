import { motion } from 'framer-motion';

export default function Footer({ profile, socials }) {
  const year = new Date().getFullYear();
  const name = profile?.fullName || 'DEV_PORTFOLIO';

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-background/90 backdrop-blur-md border-t border-outline-variant/30"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 max-w-max-width mx-auto gap-6">
        <div className="text-center md:text-left">
          <div className="font-mono text-xs tracking-[0.1em] uppercase text-primary mb-2">{name}</div>
          <div className="font-mono text-xs text-on-surface-variant opacity-60">
            &copy; {year} ALL RIGHTS RESERVED.
          </div>
        </div>
        {socials.length > 0 && (
          <div className="flex gap-8 font-mono text-sm">
            {socials.map((s) => (
              <a
                key={s._id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-on-surface-variant hover:text-secondary duration-300 transition-colors hover:shadow-[0_0_10px_rgba(211,251,255,0.2)]"
              >
                {s.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.footer>
  );
}

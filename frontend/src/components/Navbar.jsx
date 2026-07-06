import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const name = profile?.fullName || 'DEV_PORTFOLIO';
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const sections = ['about', 'work', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/30 z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-mono font-bold text-primary tracking-tight"
        >
          {name}
        </a>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative font-mono text-xs tracking-[0.1em] uppercase pb-1 transition-colors duration-200 ${
                active === l.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-px bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          {profile?.cvUrl && (
            <a
              href={profile.cvUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs tracking-[0.1em] uppercase font-bold glow-hover transition-all active:scale-95"
            >
              Resume
            </a>
          )}
        </div>

        <button
          className="md:hidden text-primary active:scale-95 transition-transform"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-outline-variant/30"
          >
            <div className="flex flex-col gap-1 px-margin-mobile py-4 bg-surface-container-lowest/95">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary py-2.5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              {profile?.cvUrl && (
                <a
                  href={profile.cvUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 bg-primary-container text-on-primary-container text-center px-6 py-2.5 font-mono text-xs tracking-[0.1em] uppercase font-bold transition-all active:scale-95"
                >
                  Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

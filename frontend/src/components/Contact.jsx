import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';
import client from '../api/client.js';

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter };

const empty = { name: '', email: '', subject: '', message: '' };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact({ profile, socials }) {
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await client.post('/messages', form);
      setSent(true);
      setForm(empty);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send message. Try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-violet-500/30" />
            <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase">Contact</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-violet-500/30" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text leading-tight mb-4">
            Let's work together.
          </h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
            Have a project in mind, an interesting idea, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left info panel */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Email card */}
            {profile?.email && (
              <motion.a
                variants={fadeUp}
                whileHover={{ y: -3 }}
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 p-5 glass rounded-2xl hover:border-white/15 hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center ring-1 ring-violet-500/20 shrink-0">
                  <Mail size={17} className="text-violet-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-zinc-500 mb-0.5">Email</div>
                  <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                    {profile.email}
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-violet-400 ml-auto shrink-0 transition-colors" />
              </motion.a>
            )}

            {/* Location card */}
            {profile?.location && (
              <motion.div variants={fadeUp} className="flex items-center gap-4 p-5 glass rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center ring-1 ring-cyan-500/20 shrink-0">
                  <MapPin size={17} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">Location</div>
                  <div className="text-sm font-medium text-zinc-200">{profile.location}</div>
                </div>
              </motion.div>
            )}

            {/* Socials */}
            {socials.length > 0 && (
              <motion.div variants={fadeUp} className="p-5 glass rounded-2xl">
                <p className="text-xs text-zinc-500 mb-3 font-medium tracking-wide uppercase">Find me on</p>
                <div className="flex items-center gap-2">
                  {socials.map((s) => {
                    const Icon = iconMap[s.icon?.toLowerCase()] || Globe;
                    return (
                      <motion.a
                        key={s._id}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.platform}
                        whileHover={{ y: -3, scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        className="flex items-center justify-center w-10 h-10 rounded-xl text-zinc-400 hover:text-white border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                      >
                        <Icon size={17} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col items-center justify-center py-12 text-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center mb-2"
                  >
                    <Send size={22} className="text-emerald-400" />
                  </motion.div>
                  <p className="text-white font-semibold text-lg">Message sent!</p>
                  <p className="text-zinc-400 text-sm">I'll get back to you as soon as possible.</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-zinc-400" htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-zinc-400" htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-zinc-400" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Let's collaborate"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-xs font-medium text-zinc-400" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 resize-none transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group self-end inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-[length:200%_100%] hover:bg-right btn-glow disabled:opacity-50 transition-[background-position] duration-500"
                  >
                    {sending ? 'Sending...' : 'Send message'}
                    <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

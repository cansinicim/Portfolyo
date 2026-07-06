import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtSign, MapPin, Send } from 'lucide-react';
import client from '../api/client.js';

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
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
      setError(err.response?.data?.message || 'Transmission failed. Try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-6 flex items-center gap-4">
            <span className="text-primary-container font-mono">[03]</span> Sync with Node
          </h2>
          <p className="text-lg text-on-surface-variant mb-8">
            Ready to initiate a collaboration? Send a packet through the interface or establish a direct link via social protocols.
          </p>

          <div className="space-y-6">
            {profile?.email && (
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center rounded bg-surface-container-high border border-outline-variant/30 group-hover:border-primary-container transition-colors shadow-sm group-hover:shadow-[0_0_15px_rgba(199,243,0,0.15)]">
                  <AtSign size={20} className="text-primary-container" />
                </div>
                <div>
                  <p className="font-mono text-on-surface-variant text-[10px] tracking-[0.1em]">EMAIL_ADDRESS</p>
                  <p className="font-mono text-primary text-lg group-hover:text-primary-container transition-colors">{profile.email}</p>
                </div>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center rounded bg-surface-container-high border border-outline-variant/30 group-hover:border-primary-container transition-colors shadow-sm group-hover:shadow-[0_0_15px_rgba(199,243,0,0.15)]">
                  <MapPin size={20} className="text-primary-container" />
                </div>
                <div>
                  <p className="font-mono text-on-surface-variant text-[10px] tracking-[0.1em]">CURRENT_LOCATION</p>
                  <p className="font-mono text-primary text-lg">{profile.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel p-8 relative">
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_#c7f300]"
            />
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-12 text-center flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-primary-container/10 ring-1 ring-primary-container/40 flex items-center justify-center mb-2">
                  <Send size={22} className="text-primary-container" />
                </div>
                <p className="font-mono text-primary text-lg">&gt; PACKET_DELIVERED</p>
                <p className="text-on-surface-variant text-sm">Message received. Expect a response shortly.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 font-mono text-xs text-primary-container hover:text-primary underline underline-offset-2"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {error && (
                  <div className="font-mono text-xs text-error border border-error/40 bg-error/5 px-4 py-3">&gt; {error}</div>
                )}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary-container">SOURCE_ID:</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name or alias"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-primary font-mono py-3 transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary-container">RETURN_PATH:</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-primary font-mono py-3 transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary-container">SUBJECT_LINE:</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Let's collaborate"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-primary font-mono py-3 transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary-container">PAYLOAD_DATA:</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Brief project overview or inquiry..."
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/50 focus:border-primary-container focus:ring-0 text-primary font-mono py-3 transition-all placeholder:opacity-30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-primary-container text-on-primary-container py-4 font-mono text-xs tracking-[0.1em] uppercase font-bold glow-hover transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Send size={16} />
                  {sending ? 'Transmitting...' : 'Transmit_Packet'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

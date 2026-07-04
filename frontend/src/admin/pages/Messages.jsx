import { useEffect, useState } from 'react';
import { Mail, Trash2, CheckCheck, Clock } from 'lucide-react';
import client from '../api/client.js';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    client.get('/messages')
      .then(({ data }) => setMessages(data.data?.messages || data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await client.patch(`/messages/${id}/read`).catch(() => {});
    setMessages((msgs) => msgs.map((m) => m._id === id ? { ...m, read: true } : m));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await client.delete(`/messages/${id}`);
    if (selected?._id === id) setSelected(null);
    load();
  };

  const handleOpen = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {messages.length} total{unread > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-medium">{unread} unread</span>}
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
            ))
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-zinc-600">No messages yet.</div>
          ) : (
            messages.map((m) => (
              <button
                key={m._id}
                onClick={() => handleOpen(m)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all group
                  ${selected?._id === m._id
                    ? 'bg-indigo-500/10 border-indigo-500/30'
                    : 'bg-white/[0.03] border-white/[0.07] hover:border-white/[0.12]'
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
                  <span className={`text-sm font-medium truncate ${m.read ? 'text-zinc-300' : 'text-white'}`}>{m.name}</span>
                  <span className="ml-auto text-[10px] text-zinc-600 shrink-0 flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 truncate pl-3.5">{m.message}</p>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5">
                    <Mail size={13} /> {selected.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {selected.read && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCheck size={13} /> Read
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="p-2 rounded-xl hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
                {selected.message}
              </div>
              <p className="text-xs text-zinc-600 mt-3">
                {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="h-full min-h-[200px] flex items-center justify-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <div className="text-center text-zinc-600">
                <Mail size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

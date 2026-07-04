import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github, X, Save } from 'lucide-react';
import client from '../api/client.js';

const empty = { title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', isFeatured: false };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | project object
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    client.get('/projects?limit=100')
      .then(({ data }) => setProjects(data.data?.projects || data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setError(''); setModal('create'); };
  const openEdit = (p) => {
    setForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '' });
    setError('');
    setModal(p);
  };
  const closeModal = () => setModal(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (modal === 'create') {
        await client.post('/projects', payload);
      } else {
        await client.put(`/projects/${modal._id}`, payload);
      }
      load();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await client.delete(`/projects/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-zinc-500 text-sm mt-1">{projects.length} total</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">No projects yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p._id} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-white leading-snug">{p.title}</h3>
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-all">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {(p.technologies || []).slice(0, 4).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-medium">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={14} /></a>}
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><ExternalLink size={14} /></a>}
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${p.isFeatured ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'}`}>
                  {p.isFeatured ? 'featured' : 'standard'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111] border border-white/[0.09] rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
              <h2 className="text-sm font-semibold text-white">{modal === 'create' ? 'New Project' : 'Edit Project'}</h2>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white"><X size={17} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
              {[
                { name: 'title', label: 'Title', placeholder: 'My Awesome Project' },
                { name: 'githubUrl', label: 'GitHub URL', placeholder: 'https://github.com/...' },
                { name: 'liveUrl', label: 'Live URL', placeholder: 'https://...' },
                { name: 'technologies', label: 'Technologies (comma separated)', placeholder: 'React, Node.js, MongoDB' },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">{label}</label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Short project description..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                  className="rounded border-white/20 bg-white/[0.04] accent-indigo-500"
                />
                Featured
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-sm font-semibold transition-all">
                  <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Save, Upload, FileText, X } from 'lucide-react';
import client from '../api/client.js';

const empty = { fullName: '', title: '', about: '', location: '', cvUrl: '', profileImage: '' };

export default function Profile() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(null); // null | 'cv' | 'image'

  const imageInputRef = useRef(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    client.get('/profile')
      .then(({ data }) => {
        if (data.data) setForm({ ...empty, ...data.data });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const { fullName, title, about, location, cvUrl, profileImage } = form;
      const payload = { fullName, title, about, location, cvUrl, profileImage };
      const { data } = await client.put('/profile', payload);
      setForm({ ...empty, ...data.data });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (field, file) => {
    if (!file) return;
    setUploading(field);
    setError('');
    const body = new FormData();
    body.append('file', file);
    try {
      const { data } = await client.post('/upload', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((f) => ({ ...f, [field]: data.data.url }));
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your public profile info</p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-4">
        {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
        {success && <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">Profile saved.</div>}

        {/* Profile image upload */}
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Profile Image</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden flex items-center justify-center shrink-0">
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Upload size={18} className="text-zinc-600" />
              )}
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload('profileImage', e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={uploading === 'profileImage'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-50 transition-all"
            >
              <Upload size={13} /> {uploading === 'profileImage' ? 'Uploading...' : form.profileImage ? 'Change' : 'Upload'}
            </button>
            {form.profileImage && (
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, profileImage: '' }))}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* CV upload */}
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">CV / Resume</label>
          <div className="flex items-center gap-3">
            <input
              ref={cvInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileUpload('cvUrl', e.target.files[0])}
            />
            {form.cvUrl ? (
              <a
                href={form.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-300 hover:text-white transition-all truncate"
              >
                <FileText size={14} className="text-indigo-400 shrink-0" />
                <span className="truncate">{form.cvUrl.split('/').pop()}</span>
              </a>
            ) : (
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-600">
                No CV uploaded
              </div>
            )}
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={uploading === 'cvUrl'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] disabled:opacity-50 transition-all shrink-0"
            >
              <Upload size={13} /> {uploading === 'cvUrl' ? 'Uploading...' : form.cvUrl ? 'Change' : 'Upload'}
            </button>
            {form.cvUrl && (
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, cvUrl: '' }))}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {[
          { name: 'fullName', label: 'Full Name', placeholder: 'Jane Doe' },
          { name: 'title', label: 'Title', placeholder: 'Full Stack Developer' },
          { name: 'location', label: 'Location', placeholder: 'Istanbul, Turkey' },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">{label}</label>
            <input
              value={form[name] || ''}
              onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">About</label>
          <textarea
            value={form.about || ''}
            onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))}
            rows={5}
            placeholder="Tell your story..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-sm font-semibold transition-all">
            <Save size={14} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

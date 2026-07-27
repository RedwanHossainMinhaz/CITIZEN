import { useState } from 'react';
import { UploadCloud, Save, RotateCcw } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { ConfirmModal } from './ManageUsers';

// Converts an uploaded file into a base64 data URL so it can be stored
// entirely in the browser (no backend/file server required).
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SiteSettings() {
  const { settings, updateSettings, resetDemoData } = useAppData();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function setStat(field, value) {
    setForm((f) => ({ ...f, stats: { ...f.stats, [field]: Number(value) } }));
    setSaved(false);
  }

  async function handleImageUpload(field, file) {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    set(field, dataUrl);
  }

  function handleSave() {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-slate-500">Change images, text and the stats shown across the site.</p>

      <div className="card mt-6 flex flex-col gap-6 p-6">
        <section>
          <h3 className="mb-3 font-bold text-slate-900">Branding</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageUploadField
              label="Site logo"
              value={form.logo}
              onFile={(file) => handleImageUpload('logo', file)}
              onClear={() => set('logo', '')}
              round
            />
            <ImageUploadField
              label="Hero image (optional)"
              value={form.heroImage}
              onFile={(file) => handleImageUpload('heroImage', file)}
              onClear={() => set('heroImage', '')}
            />
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-bold text-slate-900">Text content</h3>
          <div className="flex flex-col gap-3">
            <LabeledInput label="Site name" value={form.siteName} onChange={(v) => set('siteName', v)} />
            <LabeledInput label="Tagline" value={form.tagline} onChange={(v) => set('tagline', v)} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={3}
                className="input resize-none"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-bold text-slate-900">Homepage stats</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <LabeledInput
              label="Registered citizens"
              type="number"
              value={form.stats.registeredCitizens}
              onChange={(v) => setStat('registeredCitizens', v)}
            />
            <LabeledInput
              label="Issues resolved"
              type="number"
              value={form.stats.issuesResolved}
              onChange={(v) => setStat('issuesResolved', v)}
            />
            <LabeledInput
              label="Partner agencies"
              type="number"
              value={form.stats.partnerAgencies}
              onChange={(v) => setStat('partnerAgencies', v)}
            />
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <button onClick={() => setConfirmReset(true)} className="btn-secondary text-red-600">
            <RotateCcw className="h-4 w-4" /> Reset demo data
          </button>
          <button onClick={handleSave} className="btn-primary">
            <Save className="h-4 w-4" /> {saved ? 'Saved!' : 'Save changes'}
          </button>
        </div>
      </div>

      {confirmReset && (
        <ConfirmModal
          title="Reset all demo data?"
          message="This restores the original seed users, posts, complaints and settings, and clears everything you've added or edited. This cannot be undone."
          confirmLabel="Reset everything"
          onCancel={() => setConfirmReset(false)}
          onConfirm={() => {
            resetDemoData();
            setConfirmReset(false);
          }}
        />
      )}
    </div>
  );
}

function ImageUploadField({ label, value, onFile, onClear, round }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 ${
            round ? 'rounded-full' : 'rounded-lg'
          }`}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <UploadCloud className="h-5 w-5 text-slate-300" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="btn-secondary cursor-pointer py-1.5 text-xs">
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {value && (
            <button onClick={onClear} className="text-xs text-slate-400 hover:text-red-500">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  );
}

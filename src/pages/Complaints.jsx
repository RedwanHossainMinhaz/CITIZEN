import { useState } from 'react';
import { Wrench, HeartPulse, GraduationCap, UploadCloud, Info, CheckCircle2, Circle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { id: 'Infrastructure', label: 'Infrastructure', desc: 'Roads, utilities, public spaces', icon: Wrench },
  { id: 'Health & Sanitation', label: 'Health & Sanitation', desc: 'Waste management, public health risks', icon: HeartPulse },
  { id: 'Education Services', label: 'Education Services', desc: 'School facilities, access issues', icon: GraduationCap },
];

const STEPS = ['Category', 'Details', 'Evidence'];

export default function Complaints() {
  const { currentUser } = useAuth();
  const { addComplaint } = useAppData();

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState('Infrastructure');
  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit() {
    const complaint = addComplaint({
      category,
      details,
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'Assigned',
    });
    setSubmitted(complaint);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 animate-popIn">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Complaint submitted</h1>
        <p className="mt-2 text-slate-500">
          Your complaint <span className="font-semibold text-slate-700">#{submitted.id}</span> has been assigned
          and is now being tracked. You can follow its progress from your Dashboard.
        </p>
        <button
          className="btn-primary mt-6"
          onClick={() => {
            setSubmitted(null);
            setStep(0);
            setDetails('');
            setFileName('');
          }}
        >
          Submit another complaint
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Submit a Civic Complaint</h1>
      <p className="mt-1 text-slate-500">Provide clear details to help local authorities address your issue effectively.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card animate-slideUp p-6 sm:p-8">
          <div className="mb-8 flex items-center">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-200 ${
                      i <= step ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`mt-1.5 text-xs font-medium ${i <= step ? 'text-brand-600' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 transition-colors duration-300 ${i < step ? 'bg-brand-500' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="animate-fadeIn">
              <p className="mb-3 font-semibold text-slate-800">Select Issue Category</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {CATEGORIES.map(({ id, label, desc, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setCategory(id)}
                    className={`flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-150 ${
                      category === id ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${category === id ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span className="font-semibold text-slate-800">{label}</span>
                    <span className="text-xs text-slate-500">{desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fadeIn">
              <label className="mb-2 block font-semibold text-slate-800" htmlFor="details">Complaint Details</label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={8}
                placeholder="Describe the issue specifically. Include landmarks or exact locations if applicable..."
                className="input resize-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <p className="mb-2 font-semibold text-slate-800">Attach Evidence (Optional)</p>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-14 text-center transition-colors duration-150 hover:border-brand-400 hover:bg-brand-50/40">
                <UploadCloud className="h-7 w-7 text-slate-400" />
                <span className="text-sm">
                  <span className="font-semibold text-brand-600">Click to upload</span>{' '}
                  <span className="text-slate-500">or drag and drop</span>
                </span>
                <span className="text-xs text-slate-400">SVG, PNG, JPG or PDF (max. 10MB)</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
              </label>
              {fileName && <p className="mt-2 text-sm text-slate-600">Selected file: {fileName}</p>}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
            <button className="btn-secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Save Draft
            </button>
            {step < STEPS.length - 1 ? (
              <button className="btn-primary" onClick={() => setStep((s) => s + 1)}>
                Continue to Review
              </button>
            ) : currentUser ? (
              <button className="btn-primary" onClick={handleSubmit} disabled={!details.trim()}>
                Submit Complaint
              </button>
            ) : (
              <a className="btn-primary" href="/login">Log in to submit</a>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="card animate-slideUp p-5">
            <h4 className="mb-4 font-bold text-slate-900">Live Tracking</h4>
            <ol className="flex flex-col gap-5">
              <TrackItem done label="Identity Verified" desc="System check passed" />
              <TrackItem active={true} label="Drafting Complaint" desc="Current step" />
              <TrackItem label="Authority Assignment" desc="Pending submission" />
              <TrackItem label="Resolution" desc="Awaiting action" />
            </ol>
          </div>

          <div className="card animate-slideUp flex gap-3 bg-brand-50/60 p-5">
            <Info className="h-5 w-5 shrink-0 text-brand-500" />
            <div>
              <p className="font-semibold text-slate-800">Privacy Notice</p>
              <p className="mt-1 text-sm text-slate-600">
                Your personal details are securely encrypted and only shared with the specific department handling
                this case.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TrackItem({ done, active, label, desc }) {
  return (
    <li className="flex items-start gap-3">
      {done ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
      ) : (
        <Circle className={`h-5 w-5 shrink-0 ${active ? 'fill-brand-100 text-brand-500' : 'text-slate-300'}`} />
      )}
      <div>
        <p className={`text-sm font-semibold ${active ? 'text-brand-600' : 'text-slate-800'}`}>{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </li>
  );
}

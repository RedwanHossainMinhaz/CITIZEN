import { useState } from 'react';
import { LifeBuoy, ChevronDown, MessageCircleQuestion, FileText, PhoneCall } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I submit a civic complaint?',
    a: 'Go to the Complaints tab, choose a category, describe the issue with as much detail as possible (landmarks help a lot), attach a photo if you have one, and submit. You can track its status from your Dashboard.',
  },
  {
    q: 'How long does it take for an issue to be resolved?',
    a: "It depends on the category and the responsible agency, but most infrastructure complaints are assigned within 48 hours. You'll get a status update at every stage: Drafting, Authority Assignment, and Resolution.",
  },
  {
    q: 'Can I post anonymously?',
    a: "Discussions are posted under your account handle, not your full legal name, so your identity stays reasonably private while your Trust Score still reflects your account's history.",
  },
  {
    q: 'What is a Trust Score?',
    a: 'It reflects how reliable your account has been — verified identity, accurate complaints, and constructive participation all raise it over time.',
  },
];

export default function SupportHub() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="animate-slideUp text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <LifeBuoy className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Support Hub</h1>
        <p className="mx-auto mt-2 max-w-xl text-slate-500">
          Answers to common questions, plus ways to reach a real person if you need more help.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <QuickLink icon={<MessageCircleQuestion className="h-5 w-5" />} title="Ask the community" desc="Post your question in Discussion." />
        <QuickLink icon={<FileText className="h-5 w-5" />} title="Read the guidelines" desc="Community rules and posting etiquette." />
        <QuickLink icon={<PhoneCall className="h-5 w-5" />} title="Contact support" desc="support@citizen.bd" />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Frequently asked questions</h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <div key={item.q} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-slate-800">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-out ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden px-5 pb-4 text-sm text-slate-600">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickLink({ icon, title, desc }) {
  return (
    <div className="card flex flex-col gap-2 p-5 transition-transform duration-150 hover:-translate-y-0.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">{icon}</span>
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

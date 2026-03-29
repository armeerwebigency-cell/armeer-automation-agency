import React, { useState } from 'react';
import { FadeIn, SectionTitle } from '@/components/layout-elements';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

const PLATFORMS = [
  {
    name: 'Make.com',
    logo: '/images/make.png',
    color: '#6750a4',
    desc: 'Best for visual workflow design with complex logic and native app integrations.',
    best_for: 'Teams who want powerful visual automation without deep coding.',
    pros: ['Intuitive visual builder', 'Very large integration library', 'Strong error handling', 'Affordable at scale', 'Great templates library'],
    cons: ['Limited custom code execution', 'Can get complex for developers', 'Slower for high-volume tasks'],
    pricing: 'From $9/mo',
    complexity: 'Low-Medium',
    coding: false,
    self_hosted: false,
    best_use: 'Marketing automation, CRM syncs, ecommerce flows',
  },
  {
    name: 'n8n',
    logo: '/images/n8n.png',
    color: '#e83f30',
    desc: 'Best for developers who need full control, self-hosting, and complex custom logic.',
    best_for: 'Technical teams wanting maximum power and data control.',
    pros: ['Self-hostable (full data control)', 'Full code execution (JS/Python)', 'No per-task pricing', 'Highly flexible & extensible', 'Open source'],
    cons: ['Steeper learning curve', 'Requires technical knowledge', 'Setup overhead for self-hosting'],
    pricing: 'Free (self-hosted) / $20/mo cloud',
    complexity: 'Medium-High',
    coding: true,
    self_hosted: true,
    best_use: 'Data pipelines, complex workflows, privacy-sensitive data',
  },
  {
    name: 'GoHighLevel',
    logo: '/images/highlevel.png',
    color: '#00b2a9',
    desc: 'All-in-one CRM + marketing automation platform built for agencies and SMBs.',
    best_for: 'Agencies managing multiple clients who need CRM + automation in one tool.',
    pros: ['All-in-one platform (CRM + email + SMS)', 'Built for agencies with white-labeling', 'Pipeline and funnel automation', 'Appointment booking built-in', 'Strong community'],
    cons: ['Not ideal for complex data workflows', 'Limited external integrations', 'Can be overwhelming to learn'],
    pricing: 'From $97/mo',
    complexity: 'Medium',
    coding: false,
    self_hosted: false,
    best_use: 'Agency client management, sales funnels, SMS/email campaigns',
  },
  {
    name: 'Zapier',
    logo: '/images/zapier.png',
    color: '#ff4a00',
    desc: 'The easiest entry-point to automation, best for simple linear workflows.',
    best_for: 'Non-technical users who need simple, straightforward automations fast.',
    pros: ['Easiest to use', 'Largest app directory (6,000+)', 'Great for beginners', 'Reliable and well-supported', 'Instant setup'],
    cons: ['Very expensive at scale', 'Limited to 2-step Zaps on basic plans', 'No self-hosting', 'Limited logic/branching', 'Not for complex workflows'],
    pricing: 'From $29.99/mo',
    complexity: 'Low',
    coding: false,
    self_hosted: false,
    best_use: 'Simple app-to-app connections, small team workflows',
  },
];

const FEATURES = [
  { label: 'Visual Builder', values: [true, true, true, true] },
  { label: 'Custom Code Execution', values: [false, true, false, false] },
  { label: 'Self-Hosting Option', values: [false, true, false, false] },
  { label: 'Built-in CRM', values: [false, false, true, false] },
  { label: 'SMS & WhatsApp', values: [true, true, true, false] },
  { label: 'AI/LLM Integration', values: [true, true, true, false] },
  { label: 'Error Handling', values: [true, true, false, false] },
  { label: 'API Webhooks', values: [true, true, true, true] },
  { label: 'Team Collaboration', values: [true, true, true, true] },
  { label: 'Affordable at Scale', values: [true, true, false, false] },
];

export default function Compare() {
  const [selected, setSelected] = useState<number[]>([0, 1]);

  const toggle = (i: number) => {
    if (selected.includes(i)) {
      if (selected.length > 1) setSelected(selected.filter(s => s !== i));
    } else {
      setSelected([...selected, i]);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              <Sparkles className="w-3.5 h-3.5" /> Platform Comparison
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Make.com vs n8n vs
              <br />
              <span className="text-gradient">HighLevel vs Zapier</span>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              An honest, side-by-side comparison from certified experts who've built 500+ automations on all four platforms. We'll help you pick the right tool — or combination — for your business.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {PLATFORMS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                onClick={() => toggle(i)}
                className="rounded-2xl border p-6 cursor-pointer transition-all card-hover"
                style={{
                  borderColor: selected.includes(i) ? p.color + '50' : 'rgba(255,255,255,0.07)',
                  background: selected.includes(i) ? `${p.color}08` : 'rgba(255,255,255,0.02)',
                  boxShadow: selected.includes(i) ? `0 0 20px ${p.color}20` : 'none',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{p.name}</h3>
                    <span className="text-xs font-mono" style={{ color: p.color }}>{p.pricing}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Complexity: <span className="text-white">{p.complexity}</span></p>
                  <p className="text-xs text-muted-foreground">Best for: <span className="text-white/70 text-xs">{p.best_use}</span></p>
                </div>
                {selected.includes(i) && (
                  <div className="mt-4 text-xs font-semibold px-3 py-1 rounded-full text-center" style={{ background: `${p.color}20`, color: p.color }}>
                    ✓ Selected for comparison
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Feature comparison table */}
        <FadeIn>
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden mb-10">
            <div className="p-6 border-b border-white/[0.06]">
              <h3 className="text-white font-bold text-lg">Feature Comparison Matrix</h3>
              <p className="text-muted-foreground text-sm mt-1">Comparing all 4 platforms side-by-side on key features</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-4 text-sm text-muted-foreground font-medium">Feature</th>
                    {PLATFORMS.map(p => (
                      <th key={p.name} className="text-center p-4 text-sm font-bold" style={{ color: p.color }}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feat, i) => (
                    <tr key={i} className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="p-4 text-sm text-white/80 font-medium">{feat.label}</td>
                      {feat.values.map((val, j) => (
                        <td key={j} className="p-4 text-center">
                          {val ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15">
                              <Check className="w-4 h-4 text-green-400" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10">
                              <X className="w-4 h-4 text-red-400/60" />
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Detailed pros/cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {PLATFORMS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{p.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="text-white/60 font-semibold">Best for: </span>{p.best_for}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Pros</p>
                    <ul className="space-y-1.5">
                      {p.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />{pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Cons</p>
                    <ul className="space-y-1.5">
                      {p.cons.map((con, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-white/70">
                          <X className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />{con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Still Not Sure Which Platform to Choose?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Our certified experts have worked extensively with all four platforms. Book a free strategy call and we'll recommend the exact stack for your business goals and tech maturity.
            </p>
            <a href="/#contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
              Get Expert Recommendation <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

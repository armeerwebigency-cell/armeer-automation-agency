import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  Target, Workflow, Database, MessageSquare, BarChart3, Brain,
  Check, ArrowRight, Zap, Shield, Clock, Globe, CheckCircle2, Sparkles
} from 'lucide-react';
import { FadeIn, SectionTitle } from '@/components/layout-elements';

const SERVICES_DETAIL = [
  {
    icon: Target,
    color: '#3b82f6',
    title: 'Marketing Automation',
    subtitle: 'Convert more leads, nurture faster, and close deals on autopilot.',
    description: "Stop letting leads slip through the cracks. Our marketing automation systems capture, qualify, score, and nurture every prospect through your funnel — 24/7, with zero human intervention.",
    features: [
      'AI-powered lead scoring & intelligent routing',
      'Automated email sequences triggered by behavior',
      'Multi-channel nurture campaigns (Email/SMS/WhatsApp)',
      'CRM auto-population from forms, ads, and landing pages',
      'Abandoned cart recovery with smart follow-up cadences',
      'Social media & ad campaign automation',
      'Customer segmentation and dynamic list management',
      'A/B testing automation for subject lines and content',
    ],
    tools: ['GoHighLevel', 'Make.com', 'HubSpot', 'Meta Ads API', 'Mailchimp'],
    results: { metric: '3.2x', label: 'Average lead-to-close improvement' },
    badge: 'Most Popular',
  },
  {
    icon: Workflow,
    color: '#8b5cf6',
    title: 'Workflow Automation',
    subtitle: 'Eliminate repetitive tasks. Let your team do meaningful work.',
    description: "Your team is spending 40% of their day on tasks that a well-built automation could handle in seconds. We map your entire operational workflow and automate every repetitive touchpoint.",
    features: [
      'End-to-end business process automation',
      'Approval workflows with escalation paths',
      'Automated task creation and smart routing',
      'Document generation, e-signing, and contract management',
      'Invoice generation and payment reminders',
      'Employee onboarding & HR process automation',
      'Internal Slack/Teams notification systems',
      'Cross-department handoff automations with SLA tracking',
    ],
    tools: ['n8n', 'Make.com', 'Zapier', 'Slack', 'Notion', 'ClickUp', 'DocuSign'],
    results: { metric: '18hrs', label: 'Average hours saved per employee per week' },
    badge: null,
  },
  {
    icon: Database,
    color: '#06b6d4',
    title: 'Data Integration',
    subtitle: 'Unify your data stack. Eliminate silos. Build a single source of truth.',
    description: "We build bulletproof data integration pipelines that keep every system in sync — in real time, without errors. Say goodbye to manual exports, copy-paste, and broken sync.",
    features: [
      'Bi-directional sync between CRM, ERP, and marketing tools',
      'Real-time data pipelines with error handling',
      'CRM data enrichment with AI-powered research',
      'Automated data cleanup, deduplication, and normalization',
      'Custom API connectors for any platform',
      'ETL pipelines for warehousing and business intelligence',
      'Webhook management and event-driven architecture',
      'Data validation and quality scoring automation',
    ],
    tools: ['n8n', 'Make.com', 'Salesforce', 'HubSpot', 'Airtable', 'Google Sheets'],
    results: { metric: '99.7%', label: 'Data accuracy rate across integrated systems' },
    badge: null,
  },
  {
    icon: MessageSquare,
    color: '#10b981',
    title: 'Communication Automation',
    subtitle: 'Reach every customer at the right time, on the right channel.',
    description: "We build intelligent communication automation that responds instantly, follows up consistently, and engages customers across email, SMS, WhatsApp, and chat — without manual effort.",
    features: [
      'AI chatbot and voice agent builds for website & WhatsApp',
      'WhatsApp Business API integration and campaigns',
      'Omni-channel customer communication orchestration',
      'Smart follow-up sequences triggered by behavior',
      'Automated appointment reminders and confirmation flows',
      'Customer support ticket routing and triage',
      'Personalized outreach at scale with dynamic content',
      'Slack and Teams internal communication bots',
    ],
    tools: ['WhatsApp API', 'GoHighLevel', 'Twilio', 'Claude AI', 'OpenAI', 'Slack'],
    results: { metric: '94%', label: 'Reduction in response time for customer queries' },
    badge: null,
  },
  {
    icon: BarChart3,
    color: '#f59e0b',
    title: 'Analytics & Reporting',
    subtitle: 'Real-time intelligence delivered automatically to your inbox.',
    description: "We automate your entire reporting stack — pulling data from every source, calculating KPIs, and delivering beautiful dashboards and reports exactly when you need them.",
    features: [
      'Automated executive dashboard creation and delivery',
      'Weekly and monthly performance reports automatically sent',
      'Real-time sales funnel analytics with conversion tracking',
      'Revenue forecasting and predictive analytics pipelines',
      'Marketing attribution modeling across channels',
      'Customer health score monitoring and alerts',
      'Client-facing white-label reporting automation',
      'Anomaly detection and performance drop alerting',
    ],
    tools: ['Google Analytics', 'Looker Studio', 'Airtable', 'Make.com', 'n8n', 'Salesforce'],
    results: { metric: '8hrs', label: 'Saved per analyst per week on report generation' },
    badge: null,
  },
  {
    icon: Brain,
    color: '#ef4444',
    title: 'AI Solutions',
    subtitle: 'Intelligent agents that think, decide, and act for your business.',
    description: "We build AI-powered agents that understand context, make intelligent decisions, process natural language, and improve over time — replacing entire workflows that require human judgment.",
    features: [
      'Custom AI agents trained on your business knowledge base',
      'LLM integration in existing workflows (Claude, GPT-4)',
      'AI-powered lead qualification and sales assistant bots',
      'Intelligent document processing and data extraction',
      'Natural language processing for customer support',
      'AI content generation and brand-voice copywriting',
      'Computer vision automation for document processing',
      'Custom model fine-tuning for domain-specific tasks',
    ],
    tools: ['Claude AI', 'OpenAI GPT-4', 'Google Gemini', 'LangChain', 'n8n', 'Python'],
    results: { metric: '80%', label: 'Reduction in human decision-making required' },
    badge: 'New',
  },
];

export default function Services() {
  return (
    <div className="pt-28 pb-20">
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="hero-glow w-[600px] h-[600px] bg-blue-600/10 -top-20 left-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              <Sparkles className="w-3.5 h-3.5" /> Our Services
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              End-to-End{' '}
              <span className="text-gradient">Automation</span> Services
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-10">
              We build intelligent, end-to-end automation systems that eliminate manual work, prevent revenue leakage, and scale with your business across every department.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[{ icon: Zap, text: '500+ Automations Delivered' }, { icon: Shield, text: 'Certified Platform Experts' }, { icon: Clock, text: 'Live in 1–3 Weeks' }, { icon: Globe, text: '50+ Active Clients' }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50">
                  <Icon className="w-4 h-4 text-blue-400/70" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {SERVICES_DETAIL.map((service, i) => {
          const Icon = service.icon;
          const isReverse = i % 2 !== 0;
          return (
            <FadeIn key={i} delay={0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-12 items-center">
                <div className={isReverse ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}>
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    {service.badge && <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${service.color}15`, color: service.color, border: `1px solid ${service.color}30` }}>{service.badge}</span>}
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">{service.title}</h2>
                  <p className="text-base font-medium mb-4" style={{ color: service.color }}>{service.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl border" style={{ background: `${service.color}08`, borderColor: `${service.color}20` }}>
                    <div className="text-3xl font-black" style={{ color: service.color }}>{service.results.metric}</div>
                    <div className="text-sm text-muted-foreground">{service.results.label}</div>
                  </div>
                  <a href="/#contact" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`, boxShadow: `0 0 20px ${service.color}30` }}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className={isReverse ? 'lg:order-1' : ''}>
                  <div className="rounded-xl border border-white/[0.07] bg-black/20 p-6">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">What's Included</h3>
                    <ul className="space-y-3">
                      {service.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: service.color }} /> {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-white/[0.06]">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Platforms We Use</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map(tool => (
                          <span key={tool} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/60">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </section>

      <section className="py-24 mt-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.04) 100%)' }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-black text-white mb-5">Not Sure Which Service You Need?</h2>
            <p className="text-white/60 mb-8">Book a free 30-minute strategy call. We'll audit your workflows and tell you exactly where automation can give you the fastest ROI.</p>
            <a href="/#contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
              Book Free Strategy Call <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

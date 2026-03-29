import React from 'react';
import { FadeIn, SectionTitle } from '@/components/layout-elements';
import { ArrowRight, ShoppingCart, Stethoscope, Briefcase, Building2, GraduationCap, Home, CheckCircle2, Sparkles } from 'lucide-react';

const USE_CASES = [
  {
    icon: ShoppingCart,
    color: '#3b82f6',
    industry: 'E-Commerce & Retail',
    headline: 'Scale your store without scaling your team.',
    useCases: [
      { title: 'Order Processing Automation', desc: 'Auto-sync orders from Shopify to fulfillment, accounting, and customer notification systems.' },
      { title: 'Abandoned Cart Recovery', desc: 'Multi-step SMS and WhatsApp sequences that recover 40–68% of abandoned carts automatically.' },
      { title: 'Inventory Management', desc: 'Real-time inventory alerts, auto-reorder triggers, and supplier notification flows.' },
      { title: 'Customer Loyalty Programs', desc: 'Automated point tracking, tier upgrades, reward dispatching, and win-back campaigns.' },
      { title: 'Returns & Refund Processing', desc: 'End-to-end returns automation that reduces processing time from days to minutes.' },
      { title: 'Post-Purchase Nurture', desc: 'Upsell and cross-sell sequences triggered by purchase history and browsing behavior.' },
    ],
    results: '68% cart recovery rate, 20hrs/week saved',
  },
  {
    icon: Stethoscope,
    color: '#10b981',
    industry: 'Healthcare & Clinics',
    headline: 'Focus on patients, not paperwork.',
    useCases: [
      { title: 'Appointment Booking & Reminders', desc: 'AI-powered scheduling with intelligent SMS/WhatsApp reminders that reduce no-shows by 45%.' },
      { title: 'Patient Intake Automation', desc: 'Digital intake forms, insurance verification, and record creation — all automated before the visit.' },
      { title: 'Follow-Up Care Sequences', desc: 'Post-appointment follow-ups, medication reminders, and satisfaction surveys sent automatically.' },
      { title: 'Referral Management', desc: 'Automated referral tracking, communication, and status updates between providers.' },
      { title: 'Billing & Insurance Claims', desc: 'Auto-generate invoices, submit insurance claims, and follow up on outstanding payments.' },
      { title: 'Staff Scheduling', desc: 'Automated shift scheduling, coverage requests, and payroll data sync.' },
    ],
    results: '60% admin time saved, 45% fewer no-shows',
  },
  {
    icon: Briefcase,
    color: '#8b5cf6',
    industry: 'Marketing & Agencies',
    headline: 'Deliver more for clients without more headcount.',
    useCases: [
      { title: 'Client Onboarding', desc: 'Automate contract signing, access provisioning, kickoff scheduling, and first-week deliverables.' },
      { title: 'Campaign Management', desc: 'Multi-platform campaign setup, monitoring, and optimization flows that run without manual oversight.' },
      { title: 'Report Delivery', desc: 'Auto-generated client reports pulled from all ad platforms and analytics tools, delivered on schedule.' },
      { title: 'Lead Generation', desc: 'Automated prospecting, outreach, follow-up, and CRM entry for new business development.' },
      { title: 'Content Scheduling', desc: 'AI-assisted content creation, approval workflows, and cross-platform scheduling automation.' },
      { title: 'Client Communication', desc: 'Automated project updates, milestone alerts, and approval request sequences.' },
    ],
    results: '85% faster onboarding, 3x client capacity',
  },
  {
    icon: Building2,
    color: '#f59e0b',
    industry: 'Real Estate',
    headline: 'Close more deals with automated follow-up that never sleeps.',
    useCases: [
      { title: 'Lead Capture & Qualification', desc: 'Instant response to inquiries from Zillow, Realtor.com, and your website with AI qualification.' },
      { title: 'Showing Scheduling', desc: 'Automated showing booking, confirmation, and follow-up sequences for agents and buyers.' },
      { title: 'Transaction Coordination', desc: 'Document collection, deadline tracking, and stakeholder updates throughout the closing process.' },
      { title: 'Post-Close Nurture', desc: 'Long-term follow-up sequences for referrals, anniversaries, and re-engagement campaigns.' },
      { title: 'Market Report Delivery', desc: 'Monthly automated market reports delivered to your sphere of influence.' },
      { title: 'Tenant & Property Management', desc: 'Rent collection reminders, maintenance ticket routing, and lease renewal automation.' },
    ],
    results: '40% more closings, 15hrs/week saved per agent',
  },
  {
    icon: GraduationCap,
    color: '#ef4444',
    industry: 'Coaching & Education',
    headline: 'Scale your impact without scaling your hours.',
    useCases: [
      { title: 'Course Enrollment Automation', desc: 'Auto-provision course access, welcome sequences, and learning milestone tracking.' },
      { title: 'Student Engagement', desc: 'Automated check-ins, progress nudges, and personalized encouragement based on completion rates.' },
      { title: 'Webinar Management', desc: 'Registration, reminder, replay, and follow-up sequences for every webinar you run.' },
      { title: 'Community Management', desc: 'Onboard new community members, assign resources, and trigger accountability check-ins.' },
      { title: 'Certification & Completion', desc: 'Auto-generate and deliver certificates, completion badges, and LinkedIn posts.' },
      { title: 'Payment & Subscription Management', desc: 'Failed payment recovery, plan upgrade triggers, and renewal reminder sequences.' },
    ],
    results: '90% student completion rate, 12hrs/week saved',
  },
  {
    icon: Home,
    color: '#06b6d4',
    industry: 'SaaS & Technology',
    headline: 'Reduce churn, accelerate onboarding, and scale with confidence.',
    useCases: [
      { title: 'User Onboarding Flows', desc: 'Automated feature activation nudges, milestone celebrations, and in-app guidance triggered by usage.' },
      { title: 'Trial-to-Paid Conversion', desc: 'Behavior-based trial nurture sequences that convert prospects at the right moment.' },
      { title: 'Churn Prevention', desc: 'Detect at-risk accounts by usage signals and trigger automated save campaigns before they cancel.' },
      { title: 'Customer Success Automation', desc: 'Quarterly business reviews, health score tracking, and renewal preparation flows.' },
      { title: 'Support Ticket Management', desc: 'AI-powered ticket routing, auto-responses for common issues, and escalation alerts.' },
      { title: 'Product Analytics Reporting', desc: 'Weekly product usage reports delivered to stakeholders automatically from Mixpanel or Amplitude.' },
    ],
    results: '62% churn reduction, 85% faster onboarding',
  },
];

export default function UseCases() {
  return (
    <div className="pt-28 pb-20">
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="hero-glow w-[600px] h-[600px] bg-blue-600/10 -top-20 left-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              <Sparkles className="w-3.5 h-3.5" /> Use Cases
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Automation for Every
              <br />
              <span className="text-gradient">Industry</span>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              We've built 500+ automations across 20+ industries. Here's how we solve your specific challenges — no matter your sector.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {USE_CASES.map((uc, i) => {
          const Icon = uc.icon;
          return (
            <FadeIn key={i} delay={0.05}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${uc.color}15`, border: `1px solid ${uc.color}25` }}>
                    <Icon className="w-7 h-7" style={{ color: uc.color }} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-1">{uc.industry}</h2>
                    <p className="text-base" style={{ color: uc.color }}>{uc.headline}</p>
                  </div>
                  <div className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border"
                    style={{ background: `${uc.color}08`, borderColor: `${uc.color}20`, color: uc.color }}>
                    ✓ {uc.results}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uc.useCases.map((item, j) => (
                    <div key={j} className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: uc.color }} />
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1.5">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
            <h2 className="text-4xl font-black text-white mb-5">Don't See Your Industry?</h2>
            <p className="text-white/60 mb-8">We've worked with 20+ industries. If your business has repetitive workflows, we can automate them. Book a free call to discuss your specific use case.</p>
            <a href="/#contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
              Discuss Your Use Case <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

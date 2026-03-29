import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Zap, Database, MessageSquare,
  BarChart3, Brain, Play, Check, Star, Shield, Clock, TrendingUp,
  Target, Cog, Users, ChevronDown, ChevronUp, ExternalLink,
  Mail, Phone, MapPin, Send, Globe, Calendar, Award,
  Rocket, Layers, GitBranch, Search, Sparkles, Bot,
  RefreshCw, DollarSign, AlertTriangle, XCircle, HeartHandshake,
  LayoutDashboard, Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FadeIn, SectionTitle, StaggerContainer, AnimatedCounter
} from '@/components/layout-elements';
import { useForm } from 'react-hook-form';

// ─── INTEGRATION LOGOS ────────────────────────────────────────────────────────
const INTEGRATIONS = [
  { name: 'Make.com', img: 'make.png' },
  { name: 'n8n', img: 'n8n.png' },
  { name: 'GoHighLevel', img: 'highlevel.png' },
  { name: 'Zapier', img: 'zapier.png' },
  { name: 'HubSpot', img: 'hubspot.png' },
  { name: 'Salesforce', img: 'salesforce.png' },
  { name: 'Slack', img: 'slack.png' },
  { name: 'Monday.com', img: 'monday.png' },
  { name: 'Notion', img: 'notion.png' },
  { name: 'ClickUp', img: 'clickup.png' },
  { name: 'WhatsApp', img: 'whatsapp.png' },
  { name: 'Shopify', img: 'shopify.png' },
  { name: 'Jotform', img: 'jotform.png' },
  { name: 'Meta', img: 'meta.png' },
  { name: 'Trello', img: 'trello.png' },
  { name: 'Calendly', img: 'calendly.png' },
  { name: 'Claude AI', img: 'claude.png' },
];

// ─── PAIN POINTS DATA ─────────────────────────────────────────────────────────
const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    color: 'from-red-500/20 to-orange-500/10',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
    title: "You're Losing Leads While You Sleep",
    desc: "An AI agent on your website or WhatsApp captures, qualifies, and scores leads 24/7 — so your team wakes up to warm, ready-to-close prospects, not missed opportunities.",
    solution: "AI Lead Capture Agent",
  },
  {
    icon: Clock,
    color: 'from-orange-500/20 to-yellow-500/10',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    title: "Your Follow-Ups Are Too Slow to Win",
    desc: "Speed is everything. We build instant follow-up systems that reach your leads in seconds — via email, SMS, or WhatsApp — before your competition even calls back.",
    solution: "Automated Follow-Up Systems",
  },
  {
    icon: Users,
    color: 'from-yellow-500/20 to-green-500/10',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    title: "Your Support Team is Overwhelmed",
    desc: "An AI support agent handles FAQs, bookings, complaints, and order tracking round the clock — cutting ticket volume and customer wait times dramatically.",
    solution: "AI Customer Support Agent",
  },
  {
    icon: Cog,
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    title: "Repetitive Tasks Are Killing Productivity",
    desc: "Data entry, approvals, report generation, invoicing — your team is burning 10–20 hours a week on work that should run itself. We automate it end-to-end.",
    solution: "Business Process Automation",
  },
  {
    icon: Calendar,
    color: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    title: "No-Shows Are Costing You Thousands",
    desc: "We build AI-powered booking systems that send smart reminders, confirm attendance, and auto-reschedule cancellations — so your calendar stays full and revenue doesn't leak.",
    solution: "Appointment Automation System",
  },
  {
    icon: Workflow,
    color: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    title: "Onboarding New Clients Takes Way Too Long",
    desc: "We turn your chaotic onboarding into a clean, automated pipeline — contracts sent, forms collected, tasks assigned, and clients impressed — all in hours, not days.",
    solution: "Client Onboarding Automation",
  },
];

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Target,
    title: 'Marketing Automation',
    color: 'blue',
    points: [
      'AI-powered lead scoring & routing',
      'Email campaign automation sequences',
      'Multi-channel nurture workflows',
      'Social media & ad campaign automation',
      'Retargeting & abandoned cart recovery',
      'Customer journey orchestration',
    ],
    badge: 'Most Popular',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    color: 'purple',
    points: [
      'End-to-end process automation',
      'Approval & escalation workflows',
      'Task routing & auto-assignment',
      'Smart notification systems',
      'Document generation & e-signing',
      'Internal ops & HR automation',
    ],
    badge: null,
  },
  {
    icon: Database,
    title: 'Data Integration',
    color: 'cyan',
    points: [
      'Make.com & n8n multi-tool sync',
      'CRM data enrichment pipelines',
      'Automated data cleanup & dedup',
      'Cross-platform API connections',
      'Real-time data dashboards',
      'ETL pipelines for analytics',
    ],
    badge: null,
  },
  {
    icon: MessageSquare,
    title: 'Communication Automation',
    color: 'green',
    points: [
      'WhatsApp & SMS campaign automation',
      'AI chatbot & voice agent builds',
      'Email sequence automation',
      'Slack & Teams bot integrations',
      'Customer follow-up systems',
      'Multi-channel outreach automation',
    ],
    badge: null,
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    color: 'yellow',
    points: [
      'Automated KPI dashboards',
      'Weekly/monthly report generation',
      'Sales funnel analytics automation',
      'Predictive revenue modeling',
      'Real-time business intelligence',
      'Client-facing report delivery',
    ],
    badge: null,
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    color: 'red',
    points: [
      'Custom AI agents & chatbots',
      'Natural language processing flows',
      'AI-powered content generation',
      'Computer vision automation',
      'LLM integration in workflows',
      'AI model fine-tuning & deployment',
    ],
    badge: 'New',
  },
];

// ─── PROCESS STEPS ────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We conduct a deep audit of your existing workflows, tools, and bottlenecks. In a 60-minute strategy call, we identify exactly where automation can save you the most time and money.',
    duration: '1–2 Days',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Strategy',
    desc: 'We design a custom automation roadmap tailored to your tech stack and goals. You receive a detailed implementation plan with expected ROI and timeline before we write a single line of code.',
    duration: '2–3 Days',
  },
  {
    num: '03',
    icon: GitBranch,
    title: 'Build',
    desc: 'Our certified experts build your automations in Make.com, n8n, or GoHighLevel with rigorous error handling, monitoring, and testing at every stage.',
    duration: '1–3 Weeks',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch',
    desc: "We deploy your automations live with full documentation, team training, and a staged rollout to ensure zero disruption to your business. You're live and saving time from day one.",
    duration: '2–3 Days',
  },
  {
    num: '05',
    icon: TrendingUp,
    title: 'Optimize',
    desc: 'We monitor performance, track KPIs, and continuously refine your workflows. As your business scales, your automations scale with it — smarter and faster over time.',
    duration: 'Ongoing',
  },
];

// ─── CASE STUDIES DATA ────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    industry: 'E-Commerce',
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    company: 'Fashion Retailer',
    problem: 'The brand was manually processing 200+ orders daily, losing 40% of abandoned carts, and struggling with disconnected inventory across 3 platforms.',
    solution: 'We built a complete Make.com automation suite: Shopify → CRM sync, abandoned cart recovery sequences, automated inventory alerts, and a WhatsApp order notification system.',
    results: [
      { metric: '340%', label: 'ROI in 60 days' },
      { metric: '68%', label: 'Cart recovery rate' },
      { metric: '20hrs', label: 'Saved per week' },
    ],
  },
  {
    industry: 'Healthcare',
    color: 'from-green-500/10 to-emerald-600/5',
    borderColor: 'border-green-500/20',
    company: 'Multi-Location Clinic',
    problem: "A busy healthcare group with 3 locations was spending 60% of staff time on manual appointment booking, reminders, and patient follow-up — causing burnout and no-shows.",
    solution: 'We deployed an n8n AI booking assistant integrated with their practice management system. Automatic SMS/email reminders, rescheduling flows, and post-appointment follow-up sequences.',
    results: [
      { metric: '60%', label: 'Admin time saved' },
      { metric: '45%', label: 'No-show reduction' },
      { metric: '$12K', label: 'Monthly savings' },
    ],
  },
  {
    industry: 'SaaS',
    color: 'from-purple-500/10 to-violet-600/5',
    borderColor: 'border-purple-500/20',
    company: 'B2B SaaS Platform',
    problem: 'New customer onboarding took 5–7 days with 12 manual touchpoints. Churn within the first 30 days was at 28% due to slow activation and support delays.',
    solution: 'Built a GoHighLevel automation pipeline: instant welcome sequences, guided setup emails, feature activation tracking, and an AI FAQ bot to handle 80% of support queries.',
    results: [
      { metric: '85%', label: 'Faster onboarding' },
      { metric: '62%', label: 'Churn reduction' },
      { metric: '4.9/5', label: 'Onboarding score' },
    ],
  },
];

// ─── TESTIMONIALS DATA ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, GrowthForge Agency',
    avatar: `${import.meta.env.BASE_URL}images/clients/client-1.jpg`,
    stars: 5,
    text: "Armeer completely transformed how we handle client onboarding. What used to take our team 3 days now happens automatically in under 2 hours. The ROI was evident within the first month.",
  },
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Operations Director, TechScale ME',
    avatar: `${import.meta.env.BASE_URL}images/clients/client-2.jpg`,
    stars: 5,
    text: "The n8n automation system they built for our data pipeline processes 50,000+ records daily without a single human touch. Errors dropped to near zero and our team is finally doing meaningful work.",
  },
  {
    name: 'Jennifer Park',
    role: 'Founder, StyleBox E-Commerce',
    avatar: `${import.meta.env.BASE_URL}images/clients/client-3.jpg`,
    stars: 5,
    text: "Our abandoned cart recovery rate went from 12% to 68% in 45 days. The WhatsApp automation sequence they built is generating $30K+ in recovered revenue every single month.",
  },
  {
    name: 'Marcus Thompson',
    role: 'Head of Sales, Finverse Inc.',
    avatar: `${import.meta.env.BASE_URL}images/avatar-1.png`,
    stars: 5,
    text: "Implementing their AI lead capture system was the best decision of the year. Our sales team now focuses on closing, not chasing. Lead response time went from 4 hours to under 90 seconds.",
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager, CloudOps',
    avatar: `${import.meta.env.BASE_URL}images/avatar-2.png`,
    stars: 5,
    text: "I was skeptical about automation, but the Make.com workflows they built for our marketing stack are incredible. We're running complex multi-channel campaigns on autopilot with better results.",
  },
  {
    name: 'Daniel Okonkwo',
    role: 'COO, HealthPath Clinics',
    avatar: `${import.meta.env.BASE_URL}images/avatar-3.png`,
    stars: 5,
    text: "Patient no-shows cost us $15K/month. After Armeer built our AI appointment reminder system, no-shows dropped 45% in the first month. It paid for itself in week one.",
  },
];

// ─── TEAM DATA ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'Musa Ktan',
    role: 'Lead Automation Architect',
    bio: 'Expert in cross-platform mobile development and AI-driven automation solutions that bridge apps and workflows.',
    quote: 'Great automation starts where great software meets smart engineering.',
    img: `${import.meta.env.BASE_URL}images/team/musa.png`,
    linkedin: 'https://www.linkedin.com/in/musaktanoli/',
    tools: ['n8n', 'Make.com', 'Node.js'],
  },
  {
    name: 'Malik Kamran',
    role: 'GoHighLevel & Marketing Specialist',
    bio: 'Expert in GoHighLevel, marketing automation, and funnel strategy. Passionate about optimizing client journeys and scaling businesses through data-driven campaigns.',
    quote: 'Automation isn\'t about replacing people — it\'s about empowering them to do their best work.',
    img: `${import.meta.env.BASE_URL}images/team/kamran.png`,
    linkedin: 'https://www.linkedin.com/in/malik-kamran-534264307/',
    tools: ['GoHighLevel', 'Zapier', 'Meta Ads'],
  },
  {
    name: 'Abdul Mohiz',
    role: 'AI Solutions Engineer',
    bio: 'Specializes in building intelligent AI agents, LLM integrations, and custom machine learning pipelines for business automation.',
    quote: 'The future belongs to businesses that embrace intelligent automation today.',
    img: `${import.meta.env.BASE_URL}images/team/mohiz.png`,
    linkedin: 'https://www.linkedin.com/in/abdul-mohiz/',
    tools: ['Claude AI', 'OpenAI', 'Python'],
  },
  {
    name: 'Zainab Raza',
    role: 'Client Success Manager',
    bio: 'Ensures every automation project delivers measurable ROI. Bridges technical teams and client stakeholders to drive adoption and continuous improvement.',
    quote: 'An automation that nobody uses is an automation that failed.',
    img: `${import.meta.env.BASE_URL}images/avatar-4.png`,
    linkedin: 'https://linkedin.com',
    tools: ['HubSpot', 'Notion', 'Slack'],
  },
];

// ─── BLOG POSTS ────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    category: 'Comparison',
    title: 'n8n vs Make.com: Which Automation Platform Wins in 2026?',
    excerpt: "We've built 300+ workflows on both platforms. Here's the brutally honest comparison on pricing, power, and when to use which — based on real client projects.",
    date: 'Mar 15, 2026',
    readTime: '8 min read',
    img: `${import.meta.env.BASE_URL}images/blog-1.png`,
  },
  {
    category: 'Tutorial',
    title: 'n8n vs Zapier: The Honest Comparison for 2026',
    excerpt: "Zapier is great for beginners. n8n is great for everyone else. We break down the real differences in capabilities, cost at scale, and which one will save your business more money.",
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    img: `${import.meta.env.BASE_URL}images/blog-2.png`,
  },
  {
    category: 'Strategy',
    title: 'How We Automated a $2M E-Commerce Brand in 3 Weeks',
    excerpt: "A behind-the-scenes look at how we mapped, designed, and deployed a full automation suite for a fashion e-commerce brand — and the results in the first 30 days.",
    date: 'Feb 10, 2026',
    readTime: '10 min read',
    img: `${import.meta.env.BASE_URL}images/blog-3.png`,
  },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How long does it take to build an automation?',
    a: 'Most automation projects take 1–4 weeks depending on complexity. Simple single-workflow automations (like a lead capture to CRM sync) can be live in 3–5 business days. Complex multi-system integrations with AI agents typically take 2–4 weeks. We provide a detailed timeline during the free discovery call.',
  },
  {
    q: 'What platforms do you work with?',
    a: 'We are certified experts in Make.com (formerly Integromat), n8n, GoHighLevel, Zapier, HubSpot, Salesforce, Slack, WhatsApp Business API, Notion, ClickUp, Shopify, and 50+ other platforms. If you use a tool with an API, we can automate it.',
  },
  {
    q: 'Do I need technical knowledge to manage the automations?',
    a: "No. We build user-friendly automations with full documentation, video walkthroughs, and team training. Most clients manage day-to-day monitoring easily after a 30-minute handoff session. We provide ongoing support for updates or troubleshooting whenever you need it.",
  },
  {
    q: 'What if something goes wrong with an automation?',
    a: 'All automations include built-in error handling, monitoring dashboards, and alerting. We provide maintenance support packages and respond to critical issues within 4 hours. Our error rates are below 0.1% across all client automations.',
  },
  {
    q: "What's the difference between AI automation and regular automation?",
    a: "Regular automation follows fixed rules (if X, then Y). AI automation uses machine learning to make decisions, understand context, process natural language, and improve over time. We combine both approaches — rule-based for reliability, AI for intelligence — to build systems that handle edge cases and scale beautifully.",
  },
  {
    q: 'How do you price your services?',
    a: 'We offer project-based pricing and retainer packages. Simple automations start at $800. Full automation suites for growing businesses typically range from $2,500–$8,000 based on complexity. We also offer monthly retainers for ongoing optimization and support. All pricing is transparent — no hidden fees.',
  },
  {
    q: 'Can you customize automations for my specific industry?',
    a: "Yes. We've built custom automation solutions for e-commerce, SaaS, marketing agencies, healthcare, finance, real estate, coaching, and more. Every system is tailored to your unique workflows, compliance requirements, and tech stack.",
  },
  {
    q: 'Why choose Armeer over hiring an in-house automation developer?',
    a: "Hiring in-house means 3–6 months to onboard, $80K+ annual salary, and expertise limited to one or two platforms. With Armeer, you get a certified team of specialists across 10+ platforms, ready to deploy in days, at a fraction of the cost. Plus, our systems include documentation so your team can manage them independently.",
  },
];

// ─── ACCORDION ITEM ───────────────────────────────────────────────────────────
function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className={`rounded-xl border transition-all duration-300 ${isOpen ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-500 text-white' : 'bg-white/5 text-muted-foreground'}`}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{answer}</p>
      </motion.div>
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Contact Us"
          title="Ready to Transform Your"
          highlight="Business with AI Automation?"
          subtitle="Get in touch with our experts for a free consultation. We'll analyze your workflows and show you exactly what's possible."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl p-6 border border-white/[0.07] bg-white/[0.02]">
                <h3 className="text-white font-bold text-lg mb-5">Get In Touch</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@armeer.tech', href: 'mailto:contact@armeer.tech' },
                    { icon: Phone, label: 'Phone', value: '+92 313 562 8763', href: 'tel:+923135628763' },
                    { icon: MapPin, label: 'Office', value: 'Lahore, Pakistan', href: null },
                    { icon: Globe, label: 'Available', value: '24/7 for support', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white hover:text-blue-400 transition-colors font-medium">{value}</a>
                        ) : (
                          <p className="text-sm text-white font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 border border-white/[0.07] bg-white/[0.02]">
                <h3 className="text-white font-bold text-base mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday – Friday</span>
                    <span className="text-white font-medium">9:00 AM – 6:00 PM PKT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-white font-medium">10:00 AM – 2:00 PM PKT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Support</span>
                    <span className="text-green-400 font-medium">24/7</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 border border-green-500/20 bg-green-500/[0.04]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm">Typically responds within 4 hours</span>
                </div>
                <p className="text-xs text-muted-foreground">For urgent requests, message us on WhatsApp for the fastest response.</p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn direction="right" delay={0.15} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full min-h-[500px] rounded-2xl border border-green-500/30 bg-green-500/[0.06] flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">Thank you! We'll be in touch within 4 hours to schedule your free consultation.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 space-y-5">
                <h3 className="text-white font-bold text-xl mb-1">Book Your Free Consultation</h3>
                <p className="text-muted-foreground text-sm mb-2">Tell us about your automation needs and we'll get back to you within 24 hours.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="John Smith"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">Name is required</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Email Address *</label>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="john@company.com"
                      type="email"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none transition-colors ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">Valid email required</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <input
                      {...register('phone')}
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Company Name</label>
                    <input
                      {...register('company')}
                      placeholder="Acme Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Service Interested In *</label>
                  <select
                    {...register('service', { required: true })}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors appearance-none ${errors.service ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                  >
                    <option value="" style={{ background: '#0a0f1e' }}>Select a service...</option>
                    <option value="marketing" style={{ background: '#0a0f1e' }}>Marketing Automation</option>
                    <option value="workflow" style={{ background: '#0a0f1e' }}>Workflow Automation</option>
                    <option value="data" style={{ background: '#0a0f1e' }}>Data Integration</option>
                    <option value="communication" style={{ background: '#0a0f1e' }}>Communication Automation</option>
                    <option value="analytics" style={{ background: '#0a0f1e' }}>Analytics & Reporting</option>
                    <option value="ai" style={{ background: '#0a0f1e' }}>AI Solutions</option>
                    <option value="full" style={{ background: '#0a0f1e' }}>Full Automation Suite</option>
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1">Please select a service</p>}
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Describe Your Needs *</label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={4}
                    placeholder="Tell us about your current workflow challenges and what you'd like to automate..."
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">Message is required</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-white text-base flex items-center justify-center gap-3 transition-all disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    boxShadow: '0 0 30px rgba(59,130,246,0.3)',
                  }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Schedule Free Consultation
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy. No spam, ever.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const blurRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: blurScroll } = useScroll({ target: blurRef, offset: ['start end', 'end start'] });
  const blurAmount = useTransform(blurScroll, [0, 0.4, 0.6, 1], ['8px', '0px', '0px', '8px']);
  const blurScale = useTransform(blurScroll, [0, 0.5, 1], [0.92, 1.04, 0.92]);
  const blurOpacity = useTransform(blurScroll, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.2]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG layers */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(7,11,30,0.6) 0%, rgba(7,11,30,0.3) 50%, rgba(7,11,30,0.95) 100%)' }} />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-30 z-0" />

        {/* Glows */}
        <div className="hero-glow w-[600px] h-[600px] bg-blue-600/15 -top-32 left-1/2 -translate-x-1/2 z-0" />
        <div className="hero-glow w-[400px] h-[400px] bg-cyan-500/10 top-1/2 -right-20 z-0" />
        <div className="hero-glow w-[300px] h-[300px] bg-purple-600/10 bottom-10 left-20 z-0" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }}>
              <Sparkles className="w-4 h-4 text-blue-400" />
              AI Automation Agency · Make.com · n8n · GoHighLevel Experts
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.06] mb-6 max-w-5xl"
          >
            We Build{' '}
            <span className="text-gradient">Make.com, n8n</span>
            <br />
            & HighLevel Automations
            <br />
            <span className="text-white/80 text-4xl md:text-5xl lg:text-6xl font-normal italic" style={{ fontFamily: 'serif' }}>
              That Actually Work.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
          >
            Leading AI automation agency trusted by 500+ businesses. Cut operational costs by 60%, eliminate manual tasks, and scale faster with certified automation experts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
            >
              Book a Free Consultation <ArrowRight className="w-5 h-5" />
            </a>
            <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-medium text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition-all backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              Watch How It Works
            </button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-background overflow-hidden bg-secondary">
                    <img src={`${import.meta.env.BASE_URL}images/avatar-${i}.png`} alt="client" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 mb-0.5">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                <p className="text-white/50 text-xs">500+ clients worldwide</p>
              </div>
            </div>
            {[
              { icon: Shield, text: 'Certified Experts' },
              { icon: Award, text: 'Enterprise-grade' },
              { icon: HeartHandshake, text: '24/7 Support' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/50">
                <Icon className="w-4 h-4 text-blue-400/60" />
                <span className="text-xs font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ── 2. INTEGRATIONS STRIP ─────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/[0.06] overflow-hidden" style={{ background: 'rgba(7,11,30,0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Trusted Integrations
            </p>
            <p className="text-xs text-muted-foreground/60">We connect and automate 200+ platforms</p>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(7,11,30,1), transparent)' }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, rgba(7,11,30,1), transparent)' }} />

          <div className="marquee-container">
            <div className="marquee-track" style={{ animationDuration: '40s' }}>
              {INTEGRATIONS.map((integration) => (
                <div
                  key={integration.name}
                  className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all flex-shrink-0 group"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/${integration.img}`}
                    alt={integration.name}
                    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors whitespace-nowrap">{integration.name}</span>
                </div>
              ))}
            </div>
            <div className="marquee-track" aria-hidden style={{ animationDuration: '40s' }}>
              {INTEGRATIONS.map((integration) => (
                <div
                  key={`2-${integration.name}`}
                  className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all flex-shrink-0 group"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/${integration.img}`}
                    alt={integration.name}
                    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors whitespace-nowrap">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PAIN POINTS ────────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Pain Points"
            title="Is Your Business Stuck in"
            highlight="Manual Chaos?"
            subtitle="Most businesses lose 20–30% of revenue to inefficient processes. Here's what we fix — fast."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`rounded-2xl border p-7 bg-gradient-to-br ${item.color} ${item.border} card-hover h-full group`}>
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 leading-snug">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#60a5fa' }}>
                      <CheckCircle2 className="w-4 h-4" />
                      Solution: {item.solution}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. TRANSFORM BUSINESS (Blur/Depth Scroll Section) ─────────────────── */}
      <section ref={blurRef} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Approach"
            title="How Our AI Automation Agency"
            highlight="Transforms Your Business"
            subtitle="A systematic, proven methodology that turns manual chaos into intelligent, scalable workflows — in weeks, not months."
          />

          <div className="mt-20 space-y-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  style={{ filter: `blur(${blurAmount})`, scale: blurScale, opacity: blurOpacity }}
                  className="group"
                >
                  <FadeIn delay={i * 0.1}>
                    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] card-hover ${i % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                      <div className="flex-shrink-0 flex items-center gap-5">
                        <div className="relative">
                          <div className="text-8xl font-black text-white/[0.04] leading-none select-none font-mono"
                            style={{ lineHeight: 1 }}>
                            {step.num}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
                              <Icon className="w-7 h-7 text-blue-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-mono px-3 py-1 rounded-full border border-blue-500/20 text-blue-400 bg-blue-500/5">
                            Step {step.num}
                          </span>
                          <span className="text-xs text-muted-foreground border border-white/10 px-3 py-1 rounded-full">
                            ⏱ {step.duration}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-base">{step.desc}</p>
                      </div>

                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="hidden lg:flex flex-shrink-0 items-center">
                          <div className="flex flex-col items-center gap-2">
                            {Array(3).fill(0).map((_, d) => (
                              <div key={d} className="w-1.5 h-1.5 rounded-full bg-blue-500/30" style={{ animationDelay: `${d * 0.2}s` }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. NUMBERS ────────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(6,182,212,0.03) 50%, rgba(139,92,246,0.05) 100%)' }} />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              <TrendingUp className="w-3.5 h-3.5" /> Real-Time Results
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              The Numbers{' '}
              <span className="text-gradient">Don't Lie.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Real metrics from real automations — continuously updated as we deliver results.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { value: 500, suffix: '+', label: 'Automations Delivered', icon: Zap, color: '#3b82f6' },
              { value: 15000, suffix: '+', label: 'Hours Saved for Clients', icon: Clock, color: '#06b6d4' },
              { value: 98, suffix: '%', label: 'Client Satisfaction Rate', icon: Star, color: '#8b5cf6' },
              { value: 60, suffix: '%', label: 'Avg. Cost Reduction', icon: DollarSign, color: '#10b981' },
              { value: 50, suffix: '+', label: 'Active Clients Worldwide', icon: Globe, color: '#f59e0b' },
            ].map(({ value, suffix, label, icon: Icon, color }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center group hover:border-opacity-50 card-hover"
                  style={{ '--hover-color': color } as React.CSSProperties}>
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black mb-2" style={{ color }}>
                    <AnimatedCounter target={value} suffix={suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug font-medium">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SERVICES ───────────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between mb-16">
            <SectionTitle
              badge="What We Build"
              title="End-to-End"
              highlight="Automation Services"
              subtitle="From lead capture to revenue recognition — we automate every business-critical workflow."
              centered={false}
            />
            <FadeIn delay={0.2}>
              <Link href="/services">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-blue-500/40 transition-all text-sm font-medium flex-shrink-0">
                  Explore All Services <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const colorMap: Record<string, string> = {
                blue: '#3b82f6', purple: '#8b5cf6', cyan: '#06b6d4',
                green: '#10b981', yellow: '#f59e0b', red: '#ef4444',
              };
              const c = colorMap[service.color] || '#3b82f6';
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 card-hover group h-full relative overflow-hidden">
                    {service.badge && (
                      <div className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full font-bold"
                        style={{ background: `${c}20`, color: c, border: `1px solid ${c}30` }}>
                        {service.badge}
                      </div>
                    )}
                    <div className="w-13 h-13 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: `${c}15`, border: `1px solid ${c}25`, width: 52, height: 52 }}>
                      <Icon className="w-6 h-6" style={{ color: c }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-5">{service.title}</h3>
                    <ul className="space-y-2.5">
                      {service.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: c }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-white/[0.06]">
                      <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: c }}>
                        Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS ────────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Process"
            title="From Discovery to"
            highlight="Measurable Results"
            subtitle="A structured, transparent process so you always know what's happening and why."
          />

          <div className="mt-20 relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full hidden lg:block" style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent)', top: 36 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center group">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border-2 border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all z-10 relative">
                          <Icon className="w-7 h-7 text-blue-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-blue-500/30 flex items-center justify-center text-xs font-black text-blue-400 font-mono">
                          {i + 1}
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                      <div className="text-xs text-blue-400/70 font-mono mb-3">{step.duration}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc.slice(0, 100)}...</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CASE STUDIES ───────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Case Studies"
            title="Real Automations,"
            highlight="Real Results"
            subtitle="Don't take our word for it — here's what we've actually delivered for our clients."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`rounded-2xl border p-7 bg-gradient-to-br ${study.color} ${study.borderColor} card-hover h-full flex flex-col`}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                      style={{ borderColor: study.borderColor.replace('border-', '').replace('/20', '/40'), color: '#93c5fd', background: 'rgba(59,130,246,0.1)' }}>
                      {study.industry}
                    </span>
                    <span className="text-xs text-muted-foreground">{study.company}</span>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1.5">The Problem</p>
                      <p className="text-sm text-white/80 leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5">Our Solution</p>
                      <p className="text-sm text-white/80 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.08]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-4">Results</p>
                    <div className="grid grid-cols-3 gap-3">
                      {study.results.map((r, j) => (
                        <div key={j} className="text-center">
                          <div className="text-xl font-black text-white">{r.metric}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Testimonials"
            title="What Our Clients"
            highlight="Are Saying"
            subtitle="Don't just take our word for it. Here's what 500+ businesses say about working with us."
          />

          <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {TESTIMONIALS.map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="break-inside-avoid rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 mb-5 card-hover">
                  <div className="flex gap-0.5 mb-4">
                    {Array(testimonial.stars).fill(0).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-5 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary border border-white/10 flex-shrink-0">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Meet the Team"
            title="Meet Your AI"
            highlight="Automation Experts"
            subtitle="Certified specialists who've built 500+ automations across 20+ industries."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden card-hover group">
                  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/5 relative">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-bold text-white text-base">{member.name}</h3>
                        <p className="text-xs text-blue-400 font-medium">{member.role}</p>
                      </div>
                      <a href={member.linkedin} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 hover:bg-blue-500/20 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 mb-3">{member.bio}</p>
                    <blockquote className="text-xs text-white/40 italic border-l-2 border-blue-500/30 pl-3">
                      "{member.quote}"
                    </blockquote>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {member.tools.map(tool => (
                        <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BLOG PREVIEW ──────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between mb-16">
            <SectionTitle
              badge="Latest Insights"
              title="Automation Strategies &"
              highlight="Industry Insights"
              subtitle="Guides, comparisons, and real-world strategies to help your business scale through automation."
              centered={false}
            />
            <FadeIn delay={0.2}>
              <Link href="/blog">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-blue-500/40 transition-all text-sm font-medium flex-shrink-0">
                  View All Posts <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link href="/blog">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden card-hover group cursor-pointer">
                    <div className="aspect-video overflow-hidden bg-secondary">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
                          Read More <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 section-bg-gradient pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="FAQ"
            title="Frequently Asked"
            highlight="Questions"
            subtitle="Everything you need to know about our AI Automation services."
          />

          <div className="mt-14 space-y-3">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <FAQItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8">
              <p className="text-white/70 text-sm mb-4">Still have questions? Our automation experts are happy to help.</p>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
                Ask Us Anything <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 13. CONTACT ───────────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── 14. FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.08) 100%)' }} />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="hero-glow w-[500px] h-[500px] bg-blue-600/15 -top-40 left-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
              <Rocket className="w-3.5 h-3.5" /> Start Your Automation Journey
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Scale Faster with Seamless
              <br />
              <span className="text-gradient">Workflow Automations.</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 500+ businesses that have eliminated manual work and unlocked exponential growth with our AI automation systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-bold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 0 50px rgba(59,130,246,0.4)' }}
              >
                Start Your Automation Journey <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-base font-medium text-white/80 border border-white/15 hover:border-blue-500/40 hover:text-white transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Strategy Call
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

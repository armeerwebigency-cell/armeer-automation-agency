import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import {
  Menu, X, ChevronDown, Send, Bot, User, Minimize2,
  MessageCircle, ArrowRight, Mail, Phone, MapPin,
  Linkedin, Instagram, Facebook, Twitter, ExternalLink,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
export function CustomCursor() {
  const cursorDot = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const cursorRing = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorDot.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverable = t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') ||
        t.closest('[role="button"]') || t.closest('[data-hover]');
      setIsHovering(!!hoverable);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const animate = () => {
      const ease = 0.12;
      cursorRing.current.x += (cursorDot.current.x - cursorRing.current.x) * ease;
      cursorRing.current.y += (cursorDot.current.y - cursorRing.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorDot.current.x - 4}px, ${cursorDot.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cursorRing.current.x - 20}px, ${cursorRing.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isHovering ? 10 : 8,
          height: isHovering ? 10 : 8,
          borderRadius: '50%',
          background: isHovering ? '#60a5fa' : 'white',
          boxShadow: isHovering ? '0 0 12px rgba(96,165,250,0.8)' : 'none',
          transition: 'width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s',
          transform: 'translate(-100px, -100px)',
          marginTop: -4,
          marginLeft: -4,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? 48 : 40,
          height: isHovering ? 48 : 40,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'rgba(96,165,250,0.6)' : 'rgba(255,255,255,0.3)'}`,
          background: isHovering ? 'rgba(59,130,246,0.08)' : 'transparent',
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
          scale: isClicking ? '0.85' : '1',
        }}
      />
    </>
  );
}

// ─── PRELOADER ────────────────────────────────────────────────────────────────
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setExit(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">
                Armeer<span className="text-blue-400">.</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground font-mono"
            >
              AI Automation Agency
            </motion.p>

            <div className="w-64">
              <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                <span>Initializing</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left', background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[5001] pointer-events-none"
    />
  );
}

// ─── FADE IN ANIMATION ────────────────────────────────────────────────────────
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}) {
  const dirMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };
  const { x, y } = dirMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2200,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className="number-counter">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── STAGGER CONTAINER ────────────────────────────────────────────────────────
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
export function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <FadeIn className={centered ? 'text-center' : ''}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${centered ? 'mx-auto' : ''}`}
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
          style={centered ? { margin: '0 auto' } : {}}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
export function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobile(false); }, [location]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Compare', href: '/compare' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className={`fixed top-0 w-full z-[200] transition-all duration-500 ${
      scrolled
        ? 'py-3 bg-[rgba(7,11,30,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Armeer<span className="text-blue-400">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === href
                    ? 'text-white bg-white/[0.08]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 0 20px rgba(59,130,246,0.35)',
              }}
            >
              Book Free Call
            </a>
          </div>

          <button
            onClick={() => setMobile(!mobile)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(7,11,30,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location === href ? 'text-white bg-white/10' : 'text-muted-foreground hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                >
                  Book Free Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── CHATBOT ──────────────────────────────────────────────────────────────────
// ↓ Paste your n8n AI chatbot webhook URL here once you set it up in n8n
const CHATBOT_WEBHOOK_URL = 'https://umair787.app.n8n.cloud/webhook/chatbot';

type ChatMessage = { role: 'bot' | 'user'; text: string };

const FALLBACK_RESPONSES: Record<string, string> = {
  default: "Great question! Our automation experts specialize in Make.com, n8n, and GoHighLevel. What specific workflow are you looking to automate?",
  hello: "Hey there! 👋 I'm Armeer's AI assistant. I can help answer questions about our automation services, pricing, or book you a free consultation. What would you like to know?",
  hi: "Hi! 👋 Welcome to Armeer Automation Agency. How can I help you today? Ask me anything about our automation services!",
  pricing: "Our projects typically start at $1,500 for simple automations and go up based on complexity. We offer custom quotes after a free discovery call. Want to book one?",
  services: "We specialize in:\n\n• Make.com & n8n automation\n• GoHighLevel CRM workflows\n• AI lead capture agents\n• Business process automation\n• Data integration & reporting\n• Communication automation\n\nWhich area interests you most?",
  make: "We're certified Make.com experts! We've built 300+ scenarios for clients across e-commerce, SaaS, and agencies. We can connect virtually any tool in your stack.",
  n8n: "n8n is our favorite for complex, self-hosted automation. It's perfect for data-heavy workflows and gives you complete control. We deploy and manage n8n on your infrastructure.",
  highlevel: "We're GoHighLevel power users! We build full CRM setups, automated nurture sequences, pipeline automations, and AI conversational flows — all within HighLevel.",
  zapier: "While we prefer Make.com and n8n for complex workflows, we're also experienced with Zapier. We can migrate your Zaps to more powerful tools for better performance.",
  contact: "You can reach us at:\n📧 contact@armeer.tech\n📞 +92-313-5628763\n\nOr book a free consultation directly on our website!",
  consultation: "I'd love to connect you with our team! You can book a free 30-minute strategy call where we'll analyse your workflows and show you what's possible. Interested?",
  book: "Awesome! Click the 'Book Free Call' button in the top right to schedule your free consultation. We'll discuss your automation goals and create a custom plan!",
  time: "Most automation projects take 1-4 weeks depending on complexity. Simple workflows can be live in 3-5 business days. We provide a detailed timeline during our discovery call.",
  result: "Our clients typically see:\n• 60% reduction in operational costs\n• 15-20 hours saved per week\n• 3x faster lead response time\n• 85% reduction in manual errors\n\nWant to see specific case studies?",
  case: "Some of our top results:\n\n• E-commerce brand: 340% ROI through automated marketing\n• Healthcare clinic: 60% admin time saved with AI scheduling\n• SaaS company: 85% faster customer onboarding\n\nWe'd love to add your success story!",
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return FALLBACK_RESPONSES.default;
}

async function fetchAIResponse(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const payload = {
    message,
    history: history.map(m => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text,
    })),
  };

  console.log("Sending payload:", payload);

  const res = await fetch(CHATBOT_WEBHOOK_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const raw = await res.text();
  console.log("Raw webhook response:", raw);

  if (!res.ok) {
    throw new Error(`Webhook failed: ${res.status} ${raw}`);
  }

  try {
    const data = JSON.parse(raw);
    return data.response ?? data.output ?? data.text ?? data.message ?? raw;
  } catch {
    return raw;
  }
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "👋 Hi! I'm Armeer's AI assistant. Got a task? I'll automate it!\n\nAsk me anything about our services, pricing, or automations." }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || typing) return;
    const updatedHistory: ChatMessage[] = [...messages, { role: 'user', text }];
setMessages(updatedHistory);
setInput('');
setTyping(true);
const reply = await fetchAIResponse(text, updatedHistory);
    setTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    if (!open) setUnread(prev => prev + 1);
  }, [input, open, typing, messages]);

  const handleOpen = () => { setOpen(true); setUnread(0); };

  const quickReplies = ['Our Services', 'Pricing', 'Book a Call', 'See Results'];

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'backOut' }}
            className="absolute bottom-16 right-0 w-[360px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10,14,35,0.97)',
              border: '1px solid rgba(59,130,246,0.2)',
              backdropFilter: 'blur(20px)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.08))' }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Armeer AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Online · Usually replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '320px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === 'bot'
                        ? 'text-white/90 rounded-tl-sm'
                        : 'text-white rounded-tr-sm'
                    }`}
                    style={msg.role === 'bot'
                      ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
                      : { background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => { setInput(reply); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                  style={{ cursor: 'text !important' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-2">
                Powered by Armeer AI • Available 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: open ? 'rgba(30,40,80,0.9)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
          boxShadow: open ? '0 4px 20px rgba(0,0,0,0.4)' : '0 0 30px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer() {
  const services = [
    'Marketing Automation', 'Workflow Automation', 'Data Integration',
    'Communication Automation', 'Analytics & Reporting', 'AI Solutions',
  ];
  const company = ['About Us', 'Our Process', 'Case Studies', 'Blog', 'Contact'];
  const legal = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

  return (
    <footer className="relative border-t border-white/[0.06] pt-20 pb-8">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Armeer<span className="text-blue-400">.</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              AI Automation Agency specializing in Make.com, n8n, and GoHighLevel. We build systems that actually work.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-blue-500/20 hover:border-blue-500/40 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {company.map(c => (
                <li key={c}>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@armeer.tech" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  contact@armeer.tech
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+923135628763" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  +92 313 562 8763
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Lahore, Pakistan</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {legal.map(l => (
                  <li key={l}>
                    <Link href="/" className="text-xs text-muted-foreground hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Armeer Automation Agency. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using Make.com, n8n & GoHighLevel
          </p>
        </div>
      </div>
    </footer>
  );
}

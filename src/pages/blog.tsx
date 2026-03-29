import React, { useState } from 'react';
import { FadeIn, SectionTitle } from '@/components/layout-elements';
import { ArrowUpRight, Clock, Search, Tag, Sparkles, BookOpen } from 'lucide-react';

const BLOG_POSTS = [
  {
    category: 'Comparison',
    color: '#3b82f6',
    title: 'n8n vs Make.com: Which Automation Platform Wins in 2026?',
    excerpt: "We've built 300+ workflows on both platforms. Here's the brutally honest comparison on pricing, power, and when to use which — based on real client projects across 15+ industries.",
    date: 'Mar 15, 2026',
    readTime: '8 min read',
    img: `${import.meta.env.BASE_URL}images/blog-1.png`,
    tags: ['n8n', 'Make.com', 'Comparison'],
  },
  {
    category: 'Comparison',
    color: '#8b5cf6',
    title: 'n8n vs Zapier: The Honest Comparison for 2026',
    excerpt: "Zapier is great for beginners. n8n is great for everyone else. We break down the real differences in capabilities, cost at scale, and which one will save your business more money long-term.",
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    img: `${import.meta.env.BASE_URL}images/blog-2.png`,
    tags: ['n8n', 'Zapier', 'Comparison'],
  },
  {
    category: 'Case Study',
    color: '#10b981',
    title: 'How We Automated a $2M E-Commerce Brand in 3 Weeks',
    excerpt: "A behind-the-scenes look at how we mapped, designed, and deployed a full automation suite for a fashion e-commerce brand — and the jaw-dropping results in the first 30 days.",
    date: 'Feb 10, 2026',
    readTime: '10 min read',
    img: `${import.meta.env.BASE_URL}images/blog-3.png`,
    tags: ['E-Commerce', 'Make.com', 'Case Study'],
  },
  {
    category: 'Tutorial',
    color: '#f59e0b',
    title: 'Building a 24/7 AI Lead Capture System with n8n and Claude',
    excerpt: "Step-by-step guide to building an AI agent that captures, qualifies, and routes leads from your website and WhatsApp — completely automatically, around the clock.",
    date: 'Jan 22, 2026',
    readTime: '12 min read',
    img: `${import.meta.env.BASE_URL}images/blog-1.png`,
    tags: ['n8n', 'Claude AI', 'Lead Generation'],
  },
  {
    category: 'Strategy',
    color: '#ef4444',
    title: 'The 7 Automations Every SaaS Company Should Have Running',
    excerpt: "From trial-to-paid conversion to churn prevention — these are the automation workflows that will directly impact your MRR growth in 2026.",
    date: 'Jan 8, 2026',
    readTime: '9 min read',
    img: `${import.meta.env.BASE_URL}images/blog-2.png`,
    tags: ['SaaS', 'Strategy', 'GoHighLevel'],
  },
  {
    category: 'Tutorial',
    color: '#06b6d4',
    title: 'GoHighLevel vs HubSpot: Which CRM + Automation Platform Wins?',
    excerpt: "A detailed breakdown of GoHighLevel and HubSpot across pricing, features, automation power, and which type of business should use which — from certified experts in both.",
    date: 'Dec 15, 2025',
    readTime: '11 min read',
    img: `${import.meta.env.BASE_URL}images/blog-3.png`,
    tags: ['GoHighLevel', 'HubSpot', 'CRM'],
  },
];

const CATEGORIES = ['All', 'Comparison', 'Case Study', 'Tutorial', 'Strategy'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = BLOG_POSTS.filter(post => {
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-28 pb-20">
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="hero-glow w-[600px] h-[600px] bg-blue-600/10 -top-20 left-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              <BookOpen className="w-3.5 h-3.5" /> Automation Blog
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Insights &{' '}
              <span className="text-gradient">Strategies</span>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Guides, comparisons, case studies, and real-world automation strategies from our team of certified experts. No fluff — just actionable intelligence.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & filter */}
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: activeCategory === cat ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.04)',
                    color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {filtered.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No articles match your search.</p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden card-hover group cursor-pointer">
                  <div className="aspect-video overflow-hidden bg-secondary relative">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${post.color}20`, color: post.color, border: `1px solid ${post.color}30` }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                        Read Full Article <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delay={0.3}>
          <div className="mt-16 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-10 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Want Expert Automation Advice?</h2>
            <p className="text-white/60 mb-6">Book a free consultation with our team. We'll analyze your workflows and show you exactly what's possible.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              Book Free Strategy Call
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

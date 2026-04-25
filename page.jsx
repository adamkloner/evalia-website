'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Tiny hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─── Fade-in wrapper ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Badge chip ─── */
function Chip({ children, color = 'blue' }) {
  const palette = {
    blue: 'bg-soft-blue text-learning-blue border border-learning-blue/20',
    green: 'bg-success-green text-navy border border-progress-green/40',
    cyan: 'bg-insight-cyan/10 text-insight-cyan border border-insight-cyan/30',
    purple: 'bg-purple/10 text-purple border border-purple/30',
    amber: 'bg-warning-amber/10 text-warning-amber border border-warning-amber/30',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-inter font-500 tracking-wide ${palette[color]}`}>
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Security', href: '#security' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-grey' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-learning-blue flex items-center justify-center">
            <span className="font-sora font-800 text-white text-sm">E</span>
          </div>
          <span className={`font-sora font-700 text-lg tracking-tight ${scrolled ? 'text-navy' : 'text-white'}`}>Evalia</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className={`font-inter text-sm font-medium transition-colors ${scrolled ? 'text-slate-text hover:text-navy' : 'text-white/80 hover:text-white'}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#pricing" className={`font-inter text-sm font-medium transition-colors ${scrolled ? 'text-navy hover:text-learning-blue' : 'text-white/80 hover:text-white'}`}>
            Join Pilot
          </a>
          <a href="#pricing" className="bg-learning-blue hover:bg-blue-600 text-white font-inter text-sm font-600 px-4 py-2 rounded-lg transition-all hover:shadow-md">
            Request Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}>
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-5 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-5 h-0.5 bg-current transition-all"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border-grey px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="font-inter text-sm text-slate-text hover:text-navy">
              {l.label}
            </a>
          ))}
          <a href="#pricing" className="bg-learning-blue text-white font-inter text-sm font-600 px-4 py-2.5 rounded-lg text-center">
            Request Demo
          </a>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-learning-blue/20 blur-3xl rounded-3xl scale-90 translate-y-4"></div>

      {/* Main card */}
      <div className="relative bg-navy/80 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-error-red/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-warning-amber/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-progress-green/70"></div>
          <span className="ml-3 font-inter text-xs text-white/40">Evalia — Teacher Dashboard</span>
        </div>

        <div className="p-5 grid grid-cols-3 gap-3">
          {/* Stat cards */}
          {[
            { label: 'Pending Review', value: '14', color: 'text-warning-amber', bg: 'bg-warning-amber/10' },
            { label: 'Approved Today', value: '31', color: 'text-progress-green', bg: 'bg-progress-green/10' },
            { label: 'Class Avg', value: '73%', color: 'text-insight-cyan', bg: 'bg-insight-cyan/10' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 border border-white/5`}>
              <div className={`font-sora font-700 text-2xl ${s.color}`}>{s.value}</div>
              <div className="font-inter text-xs text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Submission row */}
        <div className="px-5 pb-3">
          <div className="font-inter text-xs text-white/40 uppercase tracking-widest mb-2">Latest Submissions</div>
          {[
            { name: 'Aisha M.', task: 'Essay: Causes of WW1', range: '71–78', status: 'Awaiting approval', statusColor: 'text-warning-amber', bar: 74 },
            { name: 'Liam T.', task: 'Algebra: Quadratics', range: '85–90', status: 'Approved', statusColor: 'text-progress-green', bar: 87 },
            { name: 'Sofia K.', task: 'Chemistry: Bonding', range: '60–67', status: 'Awaiting approval', statusColor: 'text-warning-amber', bar: 63 },
          ].map(r => (
            <div key={r.name} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-7 h-7 rounded-full bg-learning-blue/30 flex items-center justify-center flex-shrink-0">
                <span className="font-inter text-xs text-white font-600">{r.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-inter text-xs text-white font-500 truncate">{r.name} — {r.task}</div>
                <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-full">
                  <div className="h-full bg-gradient-to-r from-learning-blue to-insight-cyan rounded-full" style={{ width: `${r.bar}%` }}></div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-sora text-xs text-white font-600">{r.range}</div>
                <div className={`font-inter text-xs ${r.statusColor}`}>{r.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI reasoning snippet */}
        <div className="mx-5 mb-5 mt-1 bg-white/5 border border-learning-blue/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-learning-blue/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-learning-blue animate-pulse"></div>
            </div>
            <span className="font-inter text-xs text-learning-blue font-500">AI Reasoning — Editable</span>
          </div>
          <p className="font-inter text-xs text-white/60 leading-relaxed">
            &ldquo;Student demonstrates strong thesis development but struggles to sustain argument across body paragraphs. Evidence selection is relevant; integration needs scaffolding. Suggested range: <span className="text-progress-green font-600">71–78</span>.&rdquo;
          </p>
          <div className="flex gap-2 mt-3">
            <button className="bg-learning-blue text-white font-inter text-xs px-3 py-1.5 rounded-lg">Approve & Send</button>
            <button className="border border-white/20 text-white/60 font-inter text-xs px-3 py-1.5 rounded-lg">Edit Feedback</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex flex-col justify-center pt-16">
      {/* Background geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-learning-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-insight-cyan/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"></div>
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto section-padding py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-progress-green animate-pulse-slow"></span>
              <span className="font-inter text-sm text-white/80">Now enrolling Australian pilot schools</span>
            </div>

            <h1 className="font-sora font-800 text-4xl md:text-5xl xl:text-6xl text-white leading-[1.1] tracking-tight mb-6">
              Teacher-first AI<br />
              <span className="text-gradient">feedback & marking</span><br />
              for Australian educators
            </h1>

            <p className="font-inter text-lg text-white/65 leading-relaxed mb-8 max-w-lg">
              Evalia supports tutoring centres and small schools with AI-suggested mark ranges, editable reasoning, structured student feedback, and report-ready comments — all requiring teacher approval before students see a word.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#pricing" className="bg-learning-blue hover:bg-blue-500 text-white font-inter font-600 px-7 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-learning-blue/25 text-center">
                Request a Demo
              </a>
              <a href="#how-it-works" className="border border-white/20 hover:border-white/40 text-white font-inter font-500 px-7 py-3.5 rounded-xl transition-all hover:bg-white/5 text-center">
                See How It Works
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Mark ranges, not scores', color: 'text-progress-green' },
                { label: 'Teacher approves first', color: 'text-insight-cyan' },
                { label: 'Australian curriculum aligned', color: 'text-purple' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${b.color.replace('text', 'bg')}`}></div>
                  <span className={`font-inter text-sm ${b.color}`}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockup */}
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 900 0 720 20C540 40 240 60 0 20L0 80Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TRUST STRIP
═══════════════════════════════════════════ */
function TrustStrip() {
  const items = [
    '🇦🇺  Built for Australian educators',
    '🔒  Data stored in Australia',
    '✅  Teacher approval required',
    '📋  ATAR & curriculum aligned',
    '🏫  Tutoring centres & small schools',
    '📊  Class-level insights included',
  ]
  return (
    <section className="bg-interface-grey border-y border-border-grey py-5 overflow-hidden">
      <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-inter text-sm text-slate-text font-medium px-2">{item}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PROBLEM SECTION
═══════════════════════════════════════════ */
function Problem() {
  const problems = [
    {
      icon: '⏱',
      title: 'Marking eats your evenings',
      body: 'Teachers spend 8–12 hours per week on marking and feedback — time stolen from planning, teaching, and recovery.',
    },
    {
      icon: '📉',
      title: 'Feedback arrives too late',
      body: 'By the time students receive comments, the lesson has moved on. Delayed feedback has minimal impact on learning.',
    },
    {
      icon: '🔄',
      title: 'Reporting is a painful ritual',
      body: 'Writing 30+ individual report comments per student from scratch is exhausting and inconsistent across teachers.',
    },
    {
      icon: '🧩',
      title: 'Misconceptions go undetected',
      body: 'Without pattern analysis across a class, recurring errors and knowledge gaps are invisible until exam time.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-16">
            <Chip color="amber">The Problem</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-4">
              Teachers are drowning in admin.<br />Students deserve better feedback.
            </h2>
            <p className="font-inter text-lg text-slate-text max-w-2xl mx-auto">
              The gap between what teachers want to deliver and what's realistically possible is growing. Evalia closes it.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="bg-interface-grey border border-border-grey rounded-2xl p-6 hover:border-learning-blue/30 hover:shadow-card transition-all group">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-sora font-600 text-navy text-base mb-2 group-hover:text-learning-blue transition-colors">{p.title}</h3>
                <p className="font-inter text-sm text-slate-text leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════ */
function Features() {
  const features = [
    {
      chip: 'Marking Support', chipColor: 'blue',
      title: 'AI suggests mark ranges — you decide the mark',
      body: 'Evalia never assigns a final mark. The AI analyses submissions and proposes a defensible range (e.g. 71–78) alongside its reasoning. You review, adjust, and approve.',
      bullets: ['Range + confidence shown per criterion', 'Editable AI reasoning in plain language', 'Override with one click'],
      accent: 'bg-learning-blue',
    },
    {
      chip: 'Student Feedback', chipColor: 'cyan',
      title: 'Structured, personalised feedback generated instantly',
      body: 'Each student receives targeted comments organised by strength, development area, and next steps — drafted by AI, refined by you, released only when you approve.',
      bullets: ['Strengths → Growth areas → Next steps structure', 'Tone and language level adjustable', 'No student sees anything without teacher sign-off'],
      accent: 'bg-insight-cyan',
    },
    {
      chip: 'Misconception Radar', chipColor: 'purple',
      title: 'Spot class-wide gaps before they become exam problems',
      body: 'Evalia surfaces recurring errors and misconceptions across a cohort so you can address them in the next lesson, not next term.',
      bullets: ['Heatmaps by topic and criterion', 'Flagged common errors with suggested interventions', 'Works across multiple assignments'],
      accent: 'bg-purple',
    },
    {
      chip: 'Reporting', chipColor: 'green',
      title: 'Report-ready comments in seconds, not hours',
      body: 'Pull from a student\'s assessment history to generate cohesive, curriculum-aligned report comments. Edit, approve, done.',
      bullets: ['Draws on full assessment history', 'Australian curriculum language baked in', 'Bulk generate for whole class'],
      accent: 'bg-progress-green',
    },
  ]

  return (
    <section id="features" className="py-24 bg-interface-grey">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-16">
            <Chip color="blue">Platform Features</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-4">
              Everything a teacher needs.<br />Nothing they don't.
            </h2>
            <p className="font-inter text-lg text-slate-text max-w-2xl mx-auto">
              Six core capabilities designed with Australian classroom realities in mind.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="bg-white rounded-2xl p-8 border border-border-grey hover:shadow-card-hover transition-all group h-full">
                <Chip color={f.chipColor}>{f.chip}</Chip>
                <h3 className="font-sora font-700 text-xl text-navy mt-4 mb-3 group-hover:text-learning-blue transition-colors">{f.title}</h3>
                <p className="font-inter text-slate-text text-sm leading-relaxed mb-5">{f.body}</p>
                <ul className="space-y-2">
                  {f.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 font-inter text-sm text-slate-text">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                        <span className="text-learning-blue text-xs font-700">✓</span>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload or receive submission',
      body: 'Students submit work via the Evalia portal, or teachers upload existing files. Supports essays, short answers, maths workings, and structured responses.',
      color: 'text-learning-blue',
    },
    {
      number: '02',
      title: 'AI analyses and drafts',
      body: 'Evalia reviews the submission against your rubric, suggests a mark range per criterion, generates editable reasoning, and drafts structured student feedback.',
      color: 'text-insight-cyan',
    },
    {
      number: '03',
      title: 'Teacher reviews and refines',
      body: 'You see the AI\'s suggestions first. Edit the reasoning, adjust the range, rewrite feedback in your own voice — or approve as-is with one click.',
      color: 'text-purple',
    },
    {
      number: '04',
      title: 'Students receive approved feedback',
      body: 'Only after teacher approval does feedback become visible in the student portal. Students see their results, comments, and improvement steps.',
      color: 'text-progress-green',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-16">
            <Chip color="cyan">How It Works</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-4">
              From submission to feedback in minutes
            </h2>
            <p className="font-inter text-lg text-slate-text max-w-2xl mx-auto">
              A simple four-step workflow designed to fit into your existing teaching rhythm — not disrupt it.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-learning-blue via-insight-cyan to-progress-green opacity-30"></div>

          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 120}>
              <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center px-4 py-6">
                <div className={`w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mb-5 shadow-md`}>
                  <span className={`font-sora font-800 text-2xl ${s.color}`}>{s.number}</span>
                </div>
                <h3 className="font-sora font-600 text-navy text-base mb-2">{s.title}</h3>
                <p className="font-inter text-sm text-slate-text leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TEACHER DASHBOARD MOCKUP
═══════════════════════════════════════════ */
function TeacherDashboard() {
  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-14">
            <Chip color="blue">Teacher Dashboard</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-white mt-4 mb-4">
              Full control. Zero clutter.
            </h2>
            <p className="font-inter text-lg text-white/60 max-w-2xl mx-auto">
              See every submission, review AI suggestions, and release feedback — all from one focused interface.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            {/* Tab bar */}
            <div className="flex border-b border-white/10 bg-white/3">
              {['Class Overview', 'Submissions', 'Insights', 'Reports'].map((t, i) => (
                <div key={t} className={`px-5 py-3 font-inter text-sm cursor-pointer transition-colors ${i === 1 ? 'text-white border-b-2 border-learning-blue font-600' : 'text-white/40 hover:text-white/70'}`}>
                  {t}
                </div>
              ))}
            </div>

            <div className="p-6 grid lg:grid-cols-3 gap-6">
              {/* Left: submission list */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sora font-600 text-white text-sm">Year 10 English — Essay 3</span>
                  <Chip color="amber">14 pending</Chip>
                </div>
                {[
                  { name: 'Aisha Mahmoud', score: '71–78', flag: 'Weak argument structure', status: 'pending' },
                  { name: 'Liam Thornton', score: '85–90', flag: 'Strong throughout', status: 'approved' },
                  { name: 'Sofia Kovacs', score: '60–67', flag: 'Misconception: causality', status: 'pending' },
                  { name: 'Marcus Webb', score: '78–84', flag: 'Good evidence use', status: 'approved' },
                  { name: 'Priya Nair', score: '55–62', flag: 'Missing thesis', status: 'pending' },
                ].map(r => (
                  <div key={r.name} className={`flex items-center gap-4 bg-white/5 hover:bg-white/8 border rounded-xl px-4 py-3 transition-colors cursor-pointer ${r.status === 'pending' ? 'border-warning-amber/20' : 'border-white/5'}`}>
                    <div className="w-8 h-8 rounded-full bg-learning-blue/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-inter text-xs text-white font-600">{r.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-inter text-sm text-white font-500">{r.name}</div>
                      <div className="font-inter text-xs text-white/40 truncate">{r.flag}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-sora text-sm text-progress-green font-600">{r.score}</div>
                      <div className={`font-inter text-xs ${r.status === 'pending' ? 'text-warning-amber' : 'text-progress-green'}`}>
                        {r.status === 'pending' ? 'Review' : '✓ Done'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: detail panel */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="font-inter text-xs text-white/40 uppercase tracking-widest mb-3">AI Feedback Draft</div>
                <div className="font-sora font-600 text-white text-sm mb-1">Aisha Mahmoud</div>
                <div className="font-inter text-xs text-white/50 mb-4">Essay: Causes of WW1 — Suggested range: 71–78</div>

                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Thesis clarity', pct: 72, color: 'bg-learning-blue' },
                    { label: 'Evidence use', pct: 80, color: 'bg-insight-cyan' },
                    { label: 'Argument structure', pct: 58, color: 'bg-warning-amber' },
                    { label: 'Language conventions', pct: 85, color: 'bg-progress-green' },
                  ].map(cr => (
                    <div key={cr.label}>
                      <div className="flex justify-between mb-1">
                        <span className="font-inter text-xs text-white/60">{cr.label}</span>
                        <span className="font-inter text-xs text-white font-600">{cr.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${cr.color} rounded-full`} style={{ width: `${cr.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-learning-blue/10 border border-learning-blue/20 rounded-lg p-3 mb-4">
                  <div className="font-inter text-xs text-learning-blue font-500 mb-1">AI Reasoning (editable)</div>
                  <p className="font-inter text-xs text-white/60 leading-relaxed">
                    Strong evidence selection undermined by inconsistent argument development. Thesis introduced but not sustained across body paragraphs. Recommend explicit topic sentence scaffolding.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="w-full bg-learning-blue hover:bg-blue-500 text-white font-inter text-xs font-600 py-2.5 rounded-lg transition-colors">
                    ✓ Approve & Release
                  </button>
                  <button className="w-full border border-white/20 text-white/70 font-inter text-xs py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                    ✏️ Edit Feedback
                  </button>
                </div>
              </div>
            </div>

            {/* Class insight bar */}
            <div className="border-t border-white/10 px-6 py-4 bg-white/3 flex flex-wrap gap-6">
              <div>
                <div className="font-inter text-xs text-white/40 mb-1">Most common weakness</div>
                <div className="font-inter text-sm text-warning-amber font-500">Argument structure (11/28 students)</div>
              </div>
              <div>
                <div className="font-inter text-xs text-white/40 mb-1">Class average range</div>
                <div className="font-inter text-sm text-insight-cyan font-500">71.4 – 78.6</div>
              </div>
              <div>
                <div className="font-inter text-xs text-white/40 mb-1">Misconception flagged</div>
                <div className="font-inter text-sm text-purple font-500">Causality vs correlation (7 students)</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   STUDENT PORTAL MOCKUP
═══════════════════════════════════════════ */
function StudentPortal() {
  return (
    <section className="py-24 bg-interface-grey">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <Chip color="green">Student Portal</Chip>
              <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-5">
                Feedback that actually helps students improve
              </h2>
              <p className="font-inter text-slate-text leading-relaxed mb-6">
                Students access a clean, focused portal showing their approved feedback, mark ranges, and personalised next steps. No raw AI output — only what their teacher has reviewed and released.
              </p>
              <ul className="space-y-3">
                {[
                  'See approved feedback only — never raw AI drafts',
                  'Clear strengths and areas for growth',
                  'Personalised improvement suggestions',
                  'Assignment history in one place',
                  'Simple, distraction-free interface',
                ].map(b => (
                  <li key={b} className="flex items-start gap-3 font-inter text-sm text-slate-text">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-success-green border border-progress-green/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-navy text-xs font-700">✓</span>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            {/* Student portal mockup */}
            <div className="bg-white border border-border-grey rounded-2xl overflow-hidden shadow-card max-w-sm mx-auto lg:mx-0">
              <div className="bg-soft-blue px-5 py-4 border-b border-border-grey">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-learning-blue flex items-center justify-center">
                    <span className="font-inter text-sm text-white font-600">A</span>
                  </div>
                  <div>
                    <div className="font-sora font-600 text-navy text-sm">Aisha Mahmoud</div>
                    <div className="font-inter text-xs text-slate-text">Year 10 English</div>
                  </div>
                  <div className="ml-auto">
                    <Chip color="green">Released</Chip>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="font-inter text-xs text-slate-text uppercase tracking-widest mb-1">Essay: Causes of WW1</div>
                <div className="font-sora font-700 text-navy text-2xl mb-1">71–78</div>
                <div className="font-inter text-xs text-slate-text mb-5">Suggested range — final mark from your teacher</div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-progress-green"></span>
                      <span className="font-inter text-xs text-navy font-600 uppercase tracking-wider">Strengths</span>
                    </div>
                    <p className="font-inter text-sm text-slate-text leading-relaxed bg-success-green/30 border border-progress-green/20 rounded-lg px-3 py-2.5">
                      Your evidence selection is strong. You consistently chose relevant primary sources to support your argument, particularly around the alliance system.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-warning-amber"></span>
                      <span className="font-inter text-xs text-navy font-600 uppercase tracking-wider">Areas to Develop</span>
                    </div>
                    <p className="font-inter text-sm text-slate-text leading-relaxed bg-warning-amber/10 border border-warning-amber/20 rounded-lg px-3 py-2.5">
                      Your thesis appears in the introduction but isn't consistently referred back to across your body paragraphs. Try linking each paragraph back to your central argument.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-learning-blue"></span>
                      <span className="font-inter text-xs text-navy font-600 uppercase tracking-wider">Next Steps</span>
                    </div>
                    <p className="font-inter text-sm text-slate-text leading-relaxed bg-soft-blue border border-border-grey rounded-lg px-3 py-2.5">
                      Practice writing topic sentences that explicitly connect to your thesis. Try our scaffold template for structuring analytical paragraphs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECURITY & TRUST
═══════════════════════════════════════════ */
function Security() {
  const items = [
    {
      icon: '🇦🇺',
      title: 'Australian data residency',
      body: 'All student data is stored and processed in Australian data centres. We never route your data offshore.',
    },
    {
      icon: '🔒',
      title: 'Role-based access control',
      body: 'Teachers see their classes only. Centre directors see across teachers. Students see only their own approved feedback.',
    },
    {
      icon: '✅',
      title: 'Teacher approval gate',
      body: 'Zero AI output reaches a student without explicit teacher sign-off. The approval workflow is mandatory — it cannot be bypassed.',
    },
    {
      icon: '📋',
      title: 'Audit trail',
      body: 'Every feedback item records who drafted it, what was changed, when it was approved, and when it was released.',
    },
    {
      icon: '🔐',
      title: 'Encrypted at rest & in transit',
      body: 'TLS 1.3 in transit. AES-256 at rest. Student submissions are treated with the same care as medical records.',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Privacy Act compliant',
      body: 'Designed with Australia\'s Privacy Act 1988 in mind. Parental consent workflows available for students under 15.',
    },
  ]

  return (
    <section id="security" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-16">
            <Chip color="cyan">Security & Trust</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-4">
              Built for the trust schools require
            </h2>
            <p className="font-inter text-lg text-slate-text max-w-2xl mx-auto">
              Student data is not a product. Evalia is designed with privacy and safeguarding as first principles, not afterthoughts.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="bg-interface-grey border border-border-grey rounded-2xl p-6 hover:border-insight-cyan/40 hover:shadow-card transition-all h-full">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-sora font-600 text-navy text-base mb-2">{item.title}</h3>
                <p className="font-inter text-sm text-slate-text leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PRICING / PILOT
═══════════════════════════════════════════ */
function Pricing() {
  const plans = [
    {
      name: 'Pilot — Tutoring Centre',
      price: 'Free',
      sub: 'during pilot program',
      highlight: false,
      description: 'Perfect for centres with 1–3 teachers wanting to trial AI-assisted feedback on real work.',
      features: [
        'Up to 3 teacher accounts',
        'Up to 60 student submissions/month',
        'AI mark range suggestions',
        'Editable AI reasoning',
        'Student feedback portal',
        'Class insights dashboard',
        'Email support',
      ],
      cta: 'Apply for Pilot',
      ctaStyle: 'border border-navy text-navy hover:bg-navy hover:text-white',
    },
    {
      name: 'Pilot — Small School',
      price: 'Free',
      sub: 'during pilot program',
      highlight: true,
      description: 'For small schools and multi-teacher centres ready to transform feedback across subjects.',
      features: [
        'Up to 10 teacher accounts',
        'Unlimited student submissions',
        'All tutoring centre features',
        'Report comment generator',
        'Misconception radar (class-level)',
        'Bulk approve & release',
        'Dedicated onboarding session',
        'Priority support',
      ],
      cta: 'Apply for Pilot',
      ctaStyle: 'bg-learning-blue text-white hover:bg-blue-600',
    },
    {
      name: 'Post-Pilot Pricing',
      price: 'TBA',
      sub: 'announced after pilot closes',
      highlight: false,
      description: 'Pilot participants will receive early-adopter pricing and a direct say in shaping the final product.',
      features: [
        'Everything in the pilot tiers',
        'SIS/LMS integration options',
        'Custom rubric builder',
        'Parent portal access',
        'Multi-campus support',
        'Dedicated account manager',
        'Annual and monthly billing',
      ],
      cta: 'Express Interest',
      ctaStyle: 'border border-navy text-navy hover:bg-navy hover:text-white',
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-interface-grey">
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <div className="text-center mb-16">
            <Chip color="green">Pilot Program</Chip>
            <h2 className="font-sora font-700 text-3xl md:text-4xl text-navy mt-4 mb-4">
              Join the Evalia pilot — free for founding schools
            </h2>
            <p className="font-inter text-lg text-slate-text max-w-2xl mx-auto">
              We're partnering with a small cohort of Australian tutoring centres and schools to shape the platform. Pilot participants get free access and permanent early-adopter status.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <div className={`relative flex flex-col rounded-2xl border p-8 h-full transition-all ${plan.highlight ? 'bg-navy border-learning-blue shadow-2xl ring-2 ring-learning-blue/30 scale-[1.02]' : 'bg-white border-border-grey hover:shadow-card'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-learning-blue text-white font-inter text-xs font-600 px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className={`font-inter text-xs font-600 uppercase tracking-widest mb-2 ${plan.highlight ? 'text-insight-cyan' : 'text-learning-blue'}`}>
                    {plan.name}
                  </div>
                  <div className={`font-sora font-800 text-4xl mb-0.5 ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.price}</div>
                  <div className={`font-inter text-sm ${plan.highlight ? 'text-white/50' : 'text-slate-text'}`}>{plan.sub}</div>
                </div>

                <p className={`font-inter text-sm leading-relaxed mb-6 ${plan.highlight ? 'text-white/70' : 'text-slate-text'}`}>{plan.description}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2.5 font-inter text-sm ${plan.highlight ? 'text-white/80' : 'text-slate-text'}`}>
                      <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-progress-green/20' : 'bg-soft-blue'}`}>
                        <span className={`text-xs font-700 ${plan.highlight ? 'text-progress-green' : 'text-learning-blue'}`}>✓</span>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#cta" className={`block text-center font-inter font-600 text-sm px-6 py-3.5 rounded-xl transition-all ${plan.ctaStyle}`}>
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section id="cta" className="relative py-28 bg-hero-gradient overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-learning-blue/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-progress-green/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="relative max-w-3xl mx-auto section-padding text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-progress-green animate-pulse-slow"></span>
            <span className="font-inter text-sm text-white/80">Limited pilot spots available</span>
          </div>

          <h2 className="font-sora font-800 text-3xl md:text-5xl text-white leading-tight mb-6">
            Ready to give your teachers back their evenings?
          </h2>

          <p className="font-inter text-lg text-white/65 leading-relaxed mb-10 max-w-xl mx-auto">
            Join the Evalia pilot and be part of shaping the future of teacher-first AI feedback in Australia. Free access. Direct input. Permanent founding status.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="mailto:hello@evalia.com.au" className="bg-progress-green hover:bg-green-300 text-navy font-inter font-700 px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-progress-green/20 text-base">
              Apply for the Pilot →
            </a>
            <a href="mailto:hello@evalia.com.au" className="border border-white/25 hover:border-white/50 text-white font-inter font-500 px-8 py-4 rounded-xl transition-all hover:bg-white/5 text-base">
              Ask us a question
            </a>
          </div>

          <div className="font-inter text-sm text-white/40">
            No credit card required · No lock-in · Australian-built and hosted
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-learning-blue flex items-center justify-center">
                <span className="font-sora font-800 text-white text-sm">E</span>
              </div>
              <span className="font-sora font-700 text-white text-lg">Evalia</span>
            </div>
            <p className="font-inter text-sm text-white/50 leading-relaxed max-w-xs">
              AI-powered teacher-first feedback, marking support, and reporting for Australian tutoring centres and small schools.
            </p>
          </div>

          <div>
            <div className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Platform</div>
            <ul className="space-y-2">
              {['Features', 'How It Works', 'Security', 'Pricing'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase().replace(' ', '-')}`} className="font-inter text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Contact</div>
            <ul className="space-y-2">
              <li><a href="mailto:hello@evalia.com.au" className="font-inter text-sm text-white/50 hover:text-white transition-colors">hello@evalia.com.au</a></li>
              <li><span className="font-inter text-sm text-white/50">Australia</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="font-inter text-xs text-white/30">
            © {new Date().getFullYear()} Evalia. All rights reserved. ABN TBA.
          </div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Data Processing Agreement'].map(l => (
              <a key={l} href="#" className="font-inter text-xs text-white/30 hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Features />
        <HowItWorks />
        <TeacherDashboard />
        <StudentPortal />
        <Security />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

import { useEffect, useRef, useState } from 'react'

type CounterItem = { label: string; value: number; suffix?: string }

type SectionProps = {
  id: string
  children: React.ReactNode
  delay?: number
}

function Section({ id, children, delay = 0 }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function CountUp({ value, suffix = '+', label }: CounterItem) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1400
    const stepTime = Math.max(Math.floor(duration / value), 20)
    const timer = window.setInterval(() => {
      start += Math.ceil(value / (duration / stepTime))
      if (start >= value) {
        start = value
        window.clearInterval(timer)
      }
      setCount(start)
    }, stepTime)
    return () => window.clearInterval(timer)
  }, [visible, value])

  return (
    <div ref={ref} className="space-y-2">
      <p className="text-4xl font-semibold text-white md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-white/80">{label}</p>
    </div>
  )
}

function App() {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Initiatives', href: '#initiatives' },
    { label: 'Impact', href: '#impact' },
    { label: 'Blog', href: '#updates' },
    { label: 'Contact', href: '#contact' }
  ]

  const pillars = [
    {
      title: 'Heal Mind',
      description: 'Supporting mental wellness through awareness, guidance, and community support.',
      color: 'bg-indigo-50 text-indigo-700',
      icon: '🧠'
    },
    {
      title: 'Heal Body',
      description: 'Promoting physical health through healthcare access, hygiene awareness, and wellness initiatives.',
      color: 'bg-rose-50 text-rose-700',
      icon: '🏥'
    },
    {
      title: 'Heal Soil',
      description: 'Encouraging sustainable practices and environmental responsibility to protect our planet.',
      color: 'bg-emerald-50 text-emerald-700',
      icon: '🌱'
    },
    {
      title: 'Community Initiatives',
      description: 'Empowering communities through awareness, engagement, and development programs.',
      color: 'bg-amber-50 text-amber-700',
      icon: '🤝'
    }
  ]

  const stats: CounterItem[] = [
    { label: 'Lives Reached Across Communities', value: 2500 },
    { label: 'Awareness Campaigns Conducted', value: 48, suffix: '' },
    { label: 'Volunteers Engaged', value: 300 },
    { label: 'Initiatives Driving Change', value: 12, suffix: '' }
  ]

  const features = [
    { title: 'Awareness', description: 'We guide communities with knowledge, empathy, and trusted support.', icon: '📣' },
    { title: 'Action', description: 'Every program is designed to move people toward healthier choices.', icon: '⚡' },
    { title: 'Impact', description: 'Our long-term approach builds resilience across people and places.', icon: '🌿' }
  ]

  const testimonials = [
    {
      quote: 'SAAF India brought peace and direction to our neighborhood through thoughtful workshops and caring volunteers.',
      name: 'Ananya Patel',
      role: 'Community Leader, Jaipur'
    },
    {
      quote: 'Their health drives helped our families feel stronger, safer, and more connected.',
      name: 'Rahul Singh',
      role: 'Volunteer Coordinator, Pune'
    },
    {
      quote: 'The environmental sessions were inspiring, practical, and gentle in every way.',
      name: 'Deepa Sharma',
      role: 'Teacher, Rishikesh'
    }
  ]

  const posts = [
    {
      category: 'Wellness Story',
      title: 'How community care makes mental health accessible',
      excerpt: 'A closer look at our local awareness sessions and the people behind them.'
    },
    {
      category: 'Health Update',
      title: 'Clean water initiatives changing lives',
      excerpt: 'Our latest hygiene awareness campaign reached new villages this quarter.'
    },
    {
      category: 'Environment',
      title: 'Planting seeds for a greener future',
      excerpt: 'SAAF India’s soil protection programs are empowering rural conservation.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#FCFDFB] text-[#0F2E1F]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="flex items-center gap-3 text-xl font-semibold text-saaf-teal">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-saaf-teal/10 text-saaf-teal">🍃</span>
            SAAF India
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-700 transition hover:text-saaf-teal">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-saaf-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c6049] md:inline-flex"
          >
            Support Us
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-saaf-mint bg-[image:radial-gradient(circle_at_top_left,_rgba(93,202,165,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(239,146,39,0.12),_transparent_35%)] px-6 py-20 md:px-10 lg:px-16">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute left-10 top-12 h-24 w-24 rounded-full bg-saaf-teal/10 blur-2xl"></div>
            <div className="absolute right-10 top-32 h-28 w-28 rounded-full bg-saaf-amber/10 blur-2xl"></div>
            <div className="absolute left-1/2 bottom-16 h-20 w-20 rounded-full bg-saaf-coral/10 blur-2xl"></div>
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-saaf-teal shadow-sm">
                Together for Change
              </span>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-medium leading-tight text-saaf-deepgreen sm:text-5xl md:text-6xl">
                  Together for Change. Together for a Better Tomorrow.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
                  Creating impact across minds, bodies, communities, and the environment through meaningful initiatives.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-saaf-teal px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#0c6049]">
                  Support Our Mission
                </a>
                <a href="#initiatives" className="inline-flex items-center justify-center rounded-full border border-saaf-teal px-6 py-3 text-sm font-semibold text-saaf-teal transition hover:bg-saaf-teal/10">
                  Become a Volunteer
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 md:gap-6">
                {['🧠 Mental Health', '❤️ Physical Wellness', '🌿 Environmental Care', '🤝 Community Support'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative flex h-[420px] w-full max-w-lg items-center justify-center rounded-[32px] bg-white/90 p-8 shadow-soft md:h-[500px]">
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(15,110,86,0.08),transparent_30%)]"></div>
              <div className="relative flex h-full w-full flex-col justify-between rounded-[28px] border border-white/80 bg-gradient-to-br from-white to-[#EFF8F3] p-6 shadow-inner">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Community care in action</p>
                  <h2 className="text-2xl font-semibold text-saaf-teal">A calm, grounded approach to wellbeing.</h2>
                  <p className="text-sm leading-6 text-slate-600">Small acts of care create steady, trusted change across people and places.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {['Listening', 'Healthy habits', 'Earth care', 'Local support'].map((item) => (
                    <div key={item} className="rounded-3xl bg-white/90 px-4 py-5 text-sm text-slate-700 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Section id="about-text">
              <div className="max-w-xl space-y-6">
                <p className="text-sm uppercase tracking-[0.32em] text-saaf-teal/80">About SAAF India</p>
                <h2 className="text-3xl font-medium text-saaf-deepgreen sm:text-4xl">
                  Building a Better Future, One Initiative at a Time
                </h2>
                <p className="text-base leading-8 text-slate-700 sm:text-lg">
                  SAAF India is a purpose-driven organization committed to improving lives through initiatives focused on mental well-being, physical health, environmental sustainability, and community empowerment. We believe that real change begins with awareness, compassion, and collective action.
                </p>
                <a href="#initiatives" className="inline-flex items-center text-sm font-semibold text-saaf-teal transition hover:text-saaf-deepgreen">
                  Learn More →
                </a>
              </div>
            </Section>
            <Section id="about-image" delay={100}>
              <div className="relative overflow-hidden rounded-[32px] bg-saaf-mint p-6 shadow-soft">
                <div className="absolute left-4 top-4 h-16 w-16 rounded-full bg-saaf-teal/10"></div>
                <div className="absolute right-4 bottom-6 h-24 w-24 rounded-full bg-saaf-amber/15"></div>
                <div className="relative rounded-[24px] bg-white p-6 shadow-lg">
                  <div className="h-72 rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(15,110,86,0.12),transparent_40%),linear-gradient(180deg,_#f5faf7_0%,_#d9ede3_100%)]"></div>
                  <div className="mt-6 space-y-3 text-sm text-slate-700">
                    <p>Warm collaboration in the field, blending empathy with practical support.</p>
                    <p className="font-semibold text-saaf-deepgreen">Community-led care for everyone.</p>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <section id="initiatives" className="bg-[#F8F8F5] px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <Section id="initiatives-header">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm uppercase tracking-[0.32em] text-slate-500">Our Core Initiatives</p>
                <h2 className="text-3xl font-medium text-saaf-deepgreen sm:text-4xl">Four Pillars of Impact</h2>
              </div>
            </Section>
            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <Section key={pillar.title} id={`pillar-${index}`} delay={index * 80}>
                  <div className={`group flex h-full flex-col gap-4 rounded-[28px] border border-white bg-white px-6 py-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${pillar.color}`}>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-sm">
                      {pillar.icon}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-slate-900">{pillar.title}</h3>
                      <p className="text-sm leading-7 text-slate-600">{pillar.description}</p>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        <section id="impact" className="bg-saaf-deepgreen px-6 py-20 text-white md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl space-y-12">
            <Section id="impact-header">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm uppercase tracking-[0.32em] text-saaf-mint/80">Our Growing Impact</p>
                <h2 className="text-3xl font-medium sm:text-4xl">Our Growing Impact</h2>
              </div>
            </Section>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Section key={stat.label} id={`stat-${index}`} delay={index * 80}>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 shadow-soft">
                    <CountUp value={stat.value} suffix={stat.suffix ?? '+'} label={stat.label} />
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Section id="why-quote">
              <div className="rounded-[36px] bg-saaf-mint p-10 shadow-soft">
                <p className="text-4xl font-semibold leading-tight text-saaf-teal sm:text-5xl">
                  Creating Change That Matters
                </p>
              </div>
            </Section>
            <Section id="why-copy" delay={100}>
              <div className="space-y-6">
                <p className="text-base leading-8 text-slate-700">
                  Our work centers on mindful support, practical health access, and community-led environmental care. Each initiative is rooted in trust, dignity, and the belief that lasting change grows from people coming together.
                </p>
                <p className="text-base leading-8 text-slate-700">
                  We invest in awareness, action, and outcomes that uplift communities, support wellbeing, and preserve the natural world for future generations.
                </p>
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-saaf-teal/10 text-xl">
                        {feature.icon}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </section>

        <section className="bg-saaf-offwhite px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Section id="program-copy">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.32em] text-saaf-teal/80">Featured Program</p>
                <h2 className="text-3xl font-medium text-saaf-deepgreen sm:text-4xl">Driving Change Through Focused Initiatives</h2>
                <p className="max-w-xl text-base leading-8 text-slate-700">
                  From mental wellness campaigns to health awareness drives and environmental programs, every initiative is designed to create a positive and lasting impact.
                </p>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-saaf-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0c6049]">
                  Learn More
                </a>
              </div>
            </Section>
            <Section id="program-image" delay={100}>
              <div className="relative overflow-hidden rounded-[36px] bg-white p-8 shadow-soft">
                <div className="h-[420px] rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(93,202,165,0.2),transparent_30%),linear-gradient(180deg,_#fff_0%,_#e6f4eb_100%)] p-6">
                  <div className="flex h-full flex-col justify-between rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-inner">
                    <div className="space-y-3">
                      <span className="inline-flex rounded-full bg-saaf-teal/10 px-3 py-1 text-sm font-semibold text-saaf-teal">Program Spotlight</span>
                      <h3 className="text-2xl font-semibold text-saaf-deepgreen">Wellness circles, sustainable learning, lasting care.</h3>
                    </div>
                    <p className="text-sm leading-7 text-slate-700">
                      A welcoming space where community members learn healthy habits, environmental stewardship, and practical support together.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {['Mental wellness', 'Health outreach', 'Green practice', 'Community training'].map((item) => (
                        <div key={item} className="rounded-3xl bg-saaf-teal/5 px-4 py-3 text-sm text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <section className="bg-saaf-teal px-6 py-20 text-white md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl rounded-[36px] bg-saaf-teal/95 px-8 py-12 shadow-soft sm:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold sm:text-4xl">You Can Make a Difference</h2>
                <p className="max-w-2xl text-base leading-8 text-white/85">
                  Your support helps us reach more people and create a stronger, healthier society.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-saaf-teal transition hover:bg-slate-100">
                  Donate Now
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Join as Volunteer
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <Section id="testimonials-header">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-saaf-teal/80">Voices of Impact</p>
                <h2 className="text-3xl font-medium text-saaf-deepgreen sm:text-4xl">Stories from the communities we serve</h2>
              </div>
            </Section>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <Section key={item.name} id={`testimonial-${index}`} delay={index * 80}>
                  <div className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm">
                    <p className="italic leading-8 text-slate-700">“{item.quote}”</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saaf-teal/10 text-sm font-semibold text-saaf-teal">
                        {item.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        <section id="updates" className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <Section id="blog-header">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-saaf-teal/80">Latest Updates & Insights</p>
                <h2 className="text-3xl font-medium text-saaf-deepgreen sm:text-4xl">Latest Updates & Insights</h2>
              </div>
            </Section>
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Section key={post.title} id={`post-${index}`} delay={index * 80}>
                  <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <div className="h-48 bg-gradient-to-br from-saaf-mint via-white to-saaf-amber/20 p-6"></div>
                    <div className="space-y-4 px-6 py-6">
                      <span className="inline-flex rounded-full bg-saaf-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-saaf-teal">
                        {post.category}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-saaf-deepgreen">{post.title}</h3>
                        <p className="text-sm leading-6 text-slate-600">{post.excerpt}</p>
                      </div>
                      <a href="#contact" className="text-sm font-semibold text-saaf-teal transition hover:text-saaf-deepgreen">
                        Read More →
                      </a>
                    </div>
                  </article>
                </Section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#0C5E49] via-[#0F6E56] to-[#0A4735] px-6 py-24 text-white md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl rounded-[36px] bg-white/5 px-8 py-14 shadow-soft sm:px-12">
            <div className="text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">Let's Build a Better Tomorrow — Together</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">
                Every contribution counts. Every effort matters.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-saaf-teal transition hover:bg-slate-100">
                  Support the Cause
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Get Involved
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#122F25] px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-xl font-semibold text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">🍃</span>
              SAAF India
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-200">
              SAAF India is committed to creating positive change through initiatives focused on mental health, physical well-being, environmental sustainability, and community empowerment.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-saaf-mint">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-200">
              {['Home', 'About', 'Initiatives', 'Impact', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-saaf-mint">Initiatives</h3>
            <ul className="space-y-3 text-sm text-slate-200">
              {['Heal Mind', 'Heal Body', 'Heal Soil', 'Community Initiatives'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 text-sm text-slate-200">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-saaf-mint">Contact</h3>
              <p>hello@saafindia.org</p>
              <p>+91 98765 43210</p>
            </div>
            <div className="space-x-3 text-xl text-slate-200">
              <a href="#" aria-label="Instagram" className="transition hover:text-white">IG</a>
              <a href="#" aria-label="Twitter" className="transition hover:text-white">TW</a>
              <a href="#" aria-label="Facebook" className="transition hover:text-white">FB</a>
              <a href="#" aria-label="LinkedIn" className="transition hover:text-white">IN</a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-300">
          © {new Date().getFullYear()} SAAF India | Privacy Policy | Terms
        </div>
      </footer>
    </div>
  )
}

export default App

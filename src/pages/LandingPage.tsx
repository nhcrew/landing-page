import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { JSX } from 'react'
import '../App.css'
import './LandingPage.css'

const HERO_IMAGE =
  'https://www.figma.com/api/mcp/asset/d5bad4c8-db95-4301-b8ce-a2cc0d64fd58'
const DASHBOARD_IMAGE =
  'https://www.figma.com/api/mcp/asset/84ef00db-85d3-4141-a08f-fc43a6bb13d6'
// Stock photos from Unsplash
const AVATARS = {
  person1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  person2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  person3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const FEATURE_CARDS = [
  {
    title: 'Smart Categorization',
    description:
      'Automatically categorize your expenses and see where your money goes with beautiful visual charts.',
    accent: 'mint',
    icon: '📊',
  },
  {
    title: 'Budget Alerts',
    description:
      "Set spending limits and get notified when you're approaching your budget threshold.",
    accent: 'violet',
    icon: '⏰',
  },
  {
    title: 'Secure & Private',
    description:
      'Your financial data is encrypted and stored securely. We never share your information.',
    accent: 'mint',
    icon: '🔒',
  },
  {
    title: 'Spending Insights',
    description:
      'Get personalized insights and recommendations to help you save more and spend smarter.',
    accent: 'sunset',
    icon: '💡',
  },
]

const TESTIMONIALS = [
  {
    quote:
      '"XpenseTracker has completely changed how I manage my student budget. I saved over $500 last semester just by being more aware of my spending patterns!"',
    name: 'Jessica Chen',
    role: 'Junior, Business Major',
    avatar: AVATARS.person1,
  },
  {
    quote:
      '"The best budgeting app for students, hands down. Simple, beautiful, and actually helps me stick to my budget. The insights are incredibly valuable."',
    name: 'Marcus Thompson',
    role: 'Senior, Computer Science',
    avatar: AVATARS.person2,
  },
  {
    quote:
      '"I love how easy it is to track everything. The category breakdowns help me see exactly where I need to cut back. Highly recommend to all students!"',
    name: 'Sofia Martinez',
    role: 'Sophomore, Psychology',
    avatar: AVATARS.person3,
  },
]

const HOW_STEPS = [
  {
    title: 'Connect & Import',
    description: 'Sync your accounts or add transactions manually in seconds.',
  },
  {
    title: 'Categorize Smartly',
    description: 'Let XpenseTracker auto-tag spending or refine with quick edits.',
  },
  {
    title: 'Review Insights',
    description:
      'Spot trends, set alerts, and get personalized nudges to stay on budget.',
  },
]

const FOOTER_LINKS = {
  Company: ['About Us', 'Careers', 'Blog'],
  Resources: ['Help Center', 'Community', 'Guides'],
}

function LandingPage(): JSX.Element {
  const navigate = useNavigate()
  const [showEmailAlert, setShowEmailAlert] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="xpense-app">
      <header className="xpense-nav">
        <div className="xpense-container nav-content">
          <div className="brand">
            <span className="brand-icon">XT</span>
            <span className="brand-name">XpenseTracker</span>
          </div>
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            className="primary-btn nav-cta"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        <section className="xpense-hero">
          <div className="xpense-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">XpenseTracker</p>
              <h1>Track Your Student Expenses with Ease</h1>
              <p className="lead">
                Improve your fiscal practices by logging and observing your
                spending.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-btn"
                  onClick={() => navigate('/dashboard')}
                >
                  Start Tracking Free
                </button>
                <button 
                  className="ghost-btn"
                  onClick={() => navigate('/demo')}
                >
                  Watch Demo
                </button>
              </div>
              <div className="hero-stats">
                <div>
                  <p className="stat-value">50K+</p>
                  <p className="stat-label">Users</p>
                </div>
                <span className="divider" aria-hidden="true" />
                <div>
                  <p className="stat-value">4.8/5</p>
                  <p className="stat-label">User Rating</p>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-gradient" />
              <img src={HERO_IMAGE} alt="Student managing finances" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="xpense-how" id="how-it-works">
          <div className="xpense-container">
            <header className="section-header centered">
              <p className="section-eyebrow">How It Works</p>
              <h2>Get up and running in three simple steps</h2>
            </header>
            <div className="how-grid">
              {HOW_STEPS.map((step, index) => (
                <article key={step.title} className="how-step">
                  <span className="step-number">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="xpense-overview" id="features">
          <div className="xpense-container">
            <header className="section-header">
              <p className="section-eyebrow">Everything You Need to Manage Your Money</p>
              <div className="section-heading">
                <h2>Simple Dashboard for Ease of Use</h2>
                <p>
                  Our intuitive interface shows you exactly where your money is
                  going. Track daily expenses, view monthly trends, and
                  understand your spending patterns at a glance.
                </p>
              </div>
            </header>

            <div className="dashboard-preview">
              <img src={DASHBOARD_IMAGE} alt="Student expense tracker dashboard" loading="lazy" />
            </div>

            <div className="feature-grid">
              {FEATURE_CARDS.map((card) => (
                <article key={card.title} className={`feature-card accent-${card.accent}`}>
                  <div className="feature-icon" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="xpense-testimonials" id="testimonials">
          <div className="xpense-container">
            <header className="section-header centered">
              <p className="section-eyebrow">Loved by Students Everywhere</p>
              <h2>Join thousands of students who have transformed their financial habits</h2>
            </header>
            <div className="testimonial-grid">
              {TESTIMONIALS.map((item) => (
                <article key={item.name} className="testimonial-card">
                  <div className="stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <p className="quote">{item.quote}</p>
                  <div className="author">
                    <img src={item.avatar} alt={item.name} loading="lazy" />
                    <div>
                      <p className="author-name">{item.name}</p>
                      <p className="author-role">{item.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="xpense-cta">
          <div className="xpense-container cta-content">
            <div>
              <p className="section-eyebrow light">Start Taking Control of Your Finances Today</p>
              <p className="cta-subcopy">
                Simple tools, powerful insights, and the confidence to make your
                money work for you.
              </p>
            </div>
            <button
              className="primary-btn inverted"
              onClick={() => navigate('/dashboard')}
            >
              Get Started Free
            </button>
          </div>
        </section>
      </main>

      <footer className="xpense-footer" id="contact">
        <div className="xpense-container footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-icon">XT</span>
              <span className="brand-name">XpenseTracker</span>
            </div>
            <p>
              Empowering students to take control of their finances and build
              better money habits for a brighter future.
            </p>
          </div>
          <div className="footer-subscribe">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for tips, updates, and exclusive offers.</p>
            <form 
              className="subscribe-form"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) {
                  setShowEmailAlert(true)
                  setEmail('')
                  setTimeout(() => setShowEmailAlert(false), 3000)
                }
              }}
            >
              <div className="input-group">
                <span aria-hidden="true">📧</span>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="primary-btn" type="submit">
                Subscribe
              </button>
            </form>
          </div>
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="footer-links">
              <h4>{heading}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="xpense-container footer-bottom">
          <p>© {new Date().getFullYear()} XpenseTracker. All rights reserved.</p>
        </div>
      </footer>

      {showEmailAlert && (
        <div className="email-alert-overlay">
          <div className="email-alert">
            <div className="alert-icon">✓</div>
            <h3>Email Subscribed Successfully!</h3>
            <p>Thank you for subscribing to our newsletter.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage


import { Link } from 'react-router-dom'
import { ArrowLeft, Play } from 'lucide-react'
import './Demo.css'

const Demo = () => {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <div className="demo-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="demo-header-brand">
            <span className="brand-icon">XT</span>
            <span>XpenseTracker</span>
          </div>
        </div>
      </header>

      <main className="demo-main">
        <div className="demo-container">
          <div className="demo-header-section">
            <h1>Product Demo</h1>
            <p className="demo-subtitle">
              Watch how XpenseTracker helps you manage your student expenses
            </p>
          </div>

          <div className="demo-video-placeholder">
            <div className="video-icon">
              <Play size={64} />
            </div>
            <p className="placeholder-text">Demo Video Coming Soon</p>
            <p className="placeholder-subtext">
              This space will contain a video demonstration of XpenseTracker's features
            </p>
          </div>

          <div className="demo-features">
            <h2>What You'll See in the Demo</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Dashboard Overview</h3>
                <p>See how easy it is to track your expenses at a glance</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">➕</div>
                <h3>Adding Expenses</h3>
                <p>Learn how to quickly add and categorize your spending</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <h3>Visual Analytics</h3>
                <p>Explore charts and insights to understand your spending patterns</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h3>Budget Management</h3>
                <p>Discover how to set budgets and get alerts when you're close to limits</p>
              </div>
            </div>
          </div>

          <div className="demo-cta">
            <h2>Ready to Get Started?</h2>
            <p>Try XpenseTracker for free and take control of your finances today</p>
            <Link to="/dashboard" className="demo-primary-btn">
              Start Tracking Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Demo


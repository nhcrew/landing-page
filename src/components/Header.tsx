import { Wallet } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-icon">
            <Wallet size={32} />
          </div>
          <div>
            <h1 className="header-title">XpenseTracker</h1>
            <p className="header-subtitle">Track your expenses and income</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header



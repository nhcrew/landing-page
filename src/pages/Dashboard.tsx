import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Plus, Filter, DollarSign, TrendingUp, Clock } from 'lucide-react'
import { Expense } from '../App'
import AddExpenseModal from '../components/AddExpenseModal'
import ExpenseList from '../components/ExpenseList'
import './Dashboard.css'

interface DashboardProps {
  expenses: Expense[]
  onAddExpense: (expense: Omit<Expense, 'id'>) => void
  onDeleteExpense: (id: string) => void
  onEditExpense: (id: string, expense: Omit<Expense, 'id'>) => void
}

const Dashboard = ({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onEditExpense,
}: DashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = [
    'All',
    'Food & Dining',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Health',
    'Education',
    'Other',
  ]

  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory)

  const totalExpenses = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const thisMonthExpenses = expenses
    .filter((e) => {
      const expenseDate = new Date(e.date)
      return (
        e.type === 'expense' &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      )
    })
    .reduce((sum, e) => sum + e.amount, 0)

  const categoryCounts = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const topCategory =
    Object.keys(categoryCounts).length > 0
      ? Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0]
      : 'None'

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-top">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="header-brand">
            <Wallet className="wallet-icon" size={24} />
            <span>ExpenseTrack</span>
          </div>
        </div>
        <div className="dashboard-title-section">
          <div className="title-content">
            <Wallet className="title-icon" size={32} />
            <div>
              <h1>Student Expense Tracker</h1>
              <p className="subtitle">Manage your budget wisely</p>
            </div>
          </div>
          <button
            className="add-expense-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Add Expense
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon blue">
              <DollarSign size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Total Expenses</p>
              <p className="card-value">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">This Month</p>
              <p className="card-value">${thisMonthExpenses.toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon purple">
              <Clock size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Top Category</p>
              <p className="card-value">{topCategory}</p>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-header">
            <Filter size={20} />
            <h3>Filter by Category</h3>
          </div>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({cat === 'All' ? expenses.length : categoryCounts[cat] || 0})
              </button>
            ))}
          </div>
        </div>

        <div className="expense-list-container">
          {filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <Wallet className="empty-icon" size={64} />
              <p className="empty-title">No expenses recorded yet</p>
              <p className="empty-subtitle">
                Add your first expense to get started
              </p>
            </div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={onDeleteExpense}
              onEdit={onEditExpense}
            />
          )}
        </div>
      </main>

      {isModalOpen && (
        <AddExpenseModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(expense) => {
            onAddExpense(expense)
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard


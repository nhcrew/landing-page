import { Expense } from '../App'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import './ExpenseSummary.css'

interface ExpenseSummaryProps {
  expenses: Expense[]
}

const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalExpenses = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="summary">
      <div className="summary-card balance">
        <div className="summary-icon">
          <DollarSign size={24} />
        </div>
        <div className="summary-content">
          <p className="summary-label">Balance</p>
          <p className={`summary-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            ${Math.abs(balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="summary-card income">
        <div className="summary-icon">
          <TrendingUp size={24} />
        </div>
        <div className="summary-content">
          <p className="summary-label">Income</p>
          <p className="summary-value positive">${totalIncome.toFixed(2)}</p>
        </div>
      </div>

      <div className="summary-card expense">
        <div className="summary-icon">
          <TrendingDown size={24} />
        </div>
        <div className="summary-content">
          <p className="summary-label">Expenses</p>
          <p className="summary-value negative">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default ExpenseSummary




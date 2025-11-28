import { X } from 'lucide-react'
import './BudgetAlert.css'

interface BudgetAlertProps {
  onClose: () => void
  budget: number
  currentSpending: number
}

const BudgetAlert = ({ onClose, budget, currentSpending }: BudgetAlertProps) => {
  const percentage = (currentSpending / budget) * 100

  return (
    <div className="budget-alert-overlay">
      <div className="budget-alert">
        <button className="alert-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="alert-icon">⚠️</div>
        <h3>Budget Alert!</h3>
        <p className="alert-message">
          You've reached your monthly budget of <strong>${budget.toFixed(2)}</strong>
        </p>
        <p className="alert-details">
          Current spending: <strong>${currentSpending.toFixed(2)}</strong> ({percentage.toFixed(0)}%)
        </p>
      </div>
    </div>
  )
}

export default BudgetAlert


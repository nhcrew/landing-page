import { useState } from 'react'
import { X } from 'lucide-react'
import './AddExpenseModal.css'
import './BudgetModal.css'

interface BudgetModalProps {
  onClose: () => void
  onSubmit: (budget: number) => void
  currentBudget: number | null
}

const BudgetModal = ({ onClose, onSubmit, currentBudget }: BudgetModalProps) => {
  const [budget, setBudget] = useState(currentBudget?.toString() || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const budgetValue = parseFloat(budget)
    if (budgetValue > 0) {
      onSubmit(budgetValue)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content budget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Set Monthly Budget</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="budget-form">
          <div className="form-group">
            <label htmlFor="budget">Monthly Budget ($)</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            {currentBudget && (
              <p className="current-budget">Current budget: ${currentBudget.toFixed(2)}</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Set Budget
          </button>
        </form>
      </div>
    </div>
  )
}

export default BudgetModal


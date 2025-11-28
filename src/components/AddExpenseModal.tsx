import { useState } from 'react'
import { X, Plus, Calendar } from 'lucide-react'
import { Expense } from '../App'
import './AddExpenseModal.css'

interface AddExpenseModalProps {
  onClose: () => void
  onSubmit: (expense: Omit<Expense, 'id'>) => void
}

const AddExpenseModal = ({ onClose, onSubmit }: AddExpenseModalProps) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('0.00')
  const [category, setCategory] = useState('Food & Dining')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const categories = [
    'Food & Dining',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Health',
    'Education',
    'Other',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description || !amount || parseFloat(amount) <= 0) return

    onSubmit({
      title: description,
      amount: parseFloat(amount),
      category,
      date: date, // date is already in ISO format (YYYY-MM-DD)
      type: 'expense',
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value) // Input value is already in ISO format (YYYY-MM-DD)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Expense</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Lunch at cafeteria"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                required
              />
              <Calendar className="calendar-icon" size={20} />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            <Plus size={20} />
            Add Expense
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddExpenseModal


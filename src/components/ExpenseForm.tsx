import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Expense } from '../App'
import './ExpenseForm.css'

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void
}

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [type, setType] = useState<'income' | 'expense'>('expense')

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
    if (!title || !amount || !category) return

    onSubmit({
      title,
      amount: parseFloat(amount),
      category,
      date,
      type,
    })

    // Reset form
    setTitle('')
    setAmount('')
    setCategory('')
    setDate(new Date().toISOString().split('T')[0])
    setType('expense')
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <div className="type-toggle">
            <button
              type="button"
              className={`type-button ${type === 'income' ? 'active' : ''}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`type-button ${type === 'expense' ? 'active' : ''}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
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
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          <Plus size={20} />
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm




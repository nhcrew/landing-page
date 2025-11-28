import { useState } from 'react'
import { Expense } from '../App'
import { Trash2, Edit2, X, Check } from 'lucide-react'
import './ExpenseList.css'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
  onEdit: (id: string, expense: Omit<Expense, 'id'>) => void
}

const ExpenseList = ({ expenses, onDelete, onEdit }: ExpenseListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Omit<Expense, 'id'> | null>(null)

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id)
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      type: expense.type,
    })
  }

  const handleSave = (id: string) => {
    if (editForm) {
      onEdit(id, editForm)
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Health',
    'Education',
    'Other',
  ]

  if (expenses.length === 0) {
    return (
      <div className="expense-list-card">
        <h2 className="list-title">Transactions</h2>
        <div className="empty-state">
          <p>No transactions yet</p>
          <p className="empty-subtitle">Add your first transaction above</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-list-card">
      <h2 className="list-title">Transactions</h2>
      <div className="expense-list">
        {expenses
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((expense) => (
            <div
              key={expense.id}
              className={`expense-item ${expense.type} ${
                editingId === expense.id ? 'editing' : ''
              }`}
            >
              {editingId === expense.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm?.title || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm!, title: e.target.value })
                    }
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={editForm?.amount || ''}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm!,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="edit-input"
                    step="0.01"
                  />
                  <select
                    value={editForm?.category || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm!, category: e.target.value })
                    }
                    className="edit-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="edit-actions">
                    <button
                      onClick={() => handleSave(expense.id)}
                      className="icon-button save"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="icon-button cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="expense-info">
                    <div className="expense-main">
                      <h3 className="expense-title">{expense.title}</h3>
                      <p className="expense-category">{expense.category}</p>
                    </div>
                    <div className="expense-meta">
                      <p className="expense-date">
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p
                        className={`expense-amount ${
                          expense.type === 'income' ? 'positive' : 'negative'
                        }`}
                      >
                        {expense.type === 'income' ? '+' : '-'}$
                        {expense.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="expense-actions">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="icon-button edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="icon-button delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default ExpenseList



import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import './App.css'

// Legacy type export retained so existing components continue to compile.
export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    }
    setExpenses([...expenses, newExpense])
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const editExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              expenses={expenses}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App


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

  const [budget, setBudget] = useState<number | null>(() => {
    const saved = localStorage.getItem('budget')
    return saved ? parseFloat(saved) : null
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem('budget', budget.toString())
    } else {
      localStorage.removeItem('budget')
    }
  }, [budget])

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

  const setBudgetAmount = (amount: number) => {
    setBudget(amount)
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
              budget={budget}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
              onSetBudget={setBudgetAmount}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App


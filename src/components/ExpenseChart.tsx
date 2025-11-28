import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Expense } from '../App'
import './ExpenseChart.css'

interface ExpenseChartProps {
  expenses: Expense[]
}

const COLORS = ['#4f39f6', '#9810fa', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, number> = {}

    expenses
      .filter((e) => e.type === 'expense')
      .forEach((expense) => {
        categoryTotals[expense.category] =
          (categoryTotals[expense.category] || 0) + expense.amount
      })

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount: parseFloat(amount.toFixed(2)),
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  if (categoryData.length === 0) {
    return (
      <div className="expense-chart-container">
        <h3 className="chart-title">Expenses by Category</h3>
        <div className="chart-empty">
          <p>No expenses to display</p>
          <p className="chart-empty-subtitle">Add expenses to see your spending breakdown</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-chart-container">
      <h3 className="chart-title">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={categoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: '#4a5565', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#4a5565', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            labelStyle={{ color: '#101828', fontWeight: 600 }}
          />
          <Bar 
            dataKey="amount" 
            radius={[8, 8, 0, 0]}
            barSize={60}
          >
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExpenseChart


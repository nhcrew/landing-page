import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts'
import { Expense } from '../App'
import './ExpenseChart.css'

interface ExpenseChartProps {
  expenses: Expense[]
  budget: number | null
}

const COLORS = ['#4f39f6', '#9810fa', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

const ExpenseChart = ({ expenses, budget }: ExpenseChartProps) => {
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

  const totalExpenses = useMemo(() => {
    return expenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const budgetPercentage = budget ? (totalExpenses / budget) * 100 : 0

  // Custom tooltip to show percentage of budget
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value as number
      const categoryPercentage = budget ? (value / budget) * 100 : 0
      const totalPercentage = budget ? (value / totalExpenses) * 100 : 0

      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">${value.toFixed(2)}</p>
          {budget && (
            <>
              <p className="tooltip-percentage">
                {categoryPercentage.toFixed(1)}% of budget
              </p>
              <p className="tooltip-percentage-secondary">
                {totalPercentage.toFixed(1)}% of total expenses
              </p>
            </>
          )}
        </div>
      )
    }
    return null
  }

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
      <div className="chart-header">
        <h3 className="chart-title">Expenses by Category</h3>
        {budget && (
          <div className="budget-indicator">
            <span className="budget-label">Budget: ${budget.toFixed(2)}</span>
            <span className={`budget-percentage ${budgetPercentage >= 100 ? 'over' : budgetPercentage >= 80 ? 'warning' : ''}`}>
              {budgetPercentage.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
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
          <Tooltip content={<CustomTooltip />} />
          {budget && (
            <ReferenceLine
              y={budget}
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={
                <Label
                  value={`Budget: $${budget.toFixed(2)} | ${budgetPercentage.toFixed(1)}% Used`}
                  position="insideTopRight"
                  fill="#ef4444"
                  fontSize={11}
                  fontWeight={700}
                  style={{
                    backgroundColor: '#fee2e2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ef4444',
                  }}
                />
              }
            />
          )}
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


# XpenseTracker

A modern, beautiful expense tracking application built with React, TypeScript, and Vite.

## Features

- 📊 **Expense & Income Tracking** - Track both expenses and income with ease
- 💰 **Balance Summary** - View your total balance, income, and expenses at a glance
- 🏷️ **Categories** - Organize transactions by categories (Food, Transport, Shopping, etc.)
- ✏️ **Edit & Delete** - Easily edit or delete any transaction
- 💾 **Local Storage** - All data is saved locally in your browser
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.tsx      # Form to add new transactions
│   ├── ExpenseList.tsx       # List of all transactions
│   ├── ExpenseSummary.tsx    # Summary cards (Balance, Income, Expenses)
│   └── Header.tsx            # App header
├── App.tsx                   # Main app component
├── App.css                   # App styles
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## Usage

1. **Add a Transaction**: Fill out the form on the right side (or below on mobile) with:
   - Type (Income or Expense)
   - Title
   - Amount
   - Category
   - Date

2. **View Summary**: See your balance, total income, and total expenses at the top

3. **Edit Transaction**: Click the edit icon on any transaction to modify it

4. **Delete Transaction**: Click the delete icon to remove a transaction

## License

MIT




import { useState } from "react";
import Navbar from "./Navbar.jsx";
import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseList from "./ExpenseList.jsx";
import BudgetCard from "./BudgetCard.jsx";

const Dashboard = () => {
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")));
  const [expenses, setExpenses] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || {};
    return allExpenses[user?.email] || [];
  });
  const [salary, setSalaryState] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const budgets = JSON.parse(localStorage.getItem("budgets")) || {};
    return budgets[user?.email] || "";
  });
  const [showSummary, setShowSummary] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateApplied, setDateApplied] = useState(false);

  const saveExpenses = (newExpenses) => {
    setExpenses(newExpenses);
    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || {};
    allExpenses[currentUser.email] = newExpenses;
    localStorage.setItem("expenses", JSON.stringify(allExpenses));
  };

  const setSalary = (val) => {
    setSalaryState(val);
    const budgets = JSON.parse(localStorage.getItem("budgets")) || {};
    budgets[currentUser.email] = val;
    localStorage.setItem("budgets", JSON.stringify(budgets));
  };

  const addExpense = (expense) => {
    saveExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    saveExpenses(expenses.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
    else if (editIndex !== null && editIndex > index) setEditIndex(editIndex - 1);
  };

  const editExpense = (index) => {
    setEditIndex(index);
  };

  const updateExpense = (updated) => {
    const newExpenses = expenses.map((e, i) => (i === editIndex ? updated : e));
    saveExpenses(newExpenses);
    setEditIndex(null);
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const getFilteredByDate = () => {
    if (!dateApplied || (!startDate && !endDate)) return expenses;
    return expenses.filter((e) => {
      const d = new Date(e.date);
      if (startDate && endDate) {
        const s = new Date(startDate);
        const en = new Date(endDate);
        en.setHours(23, 59, 59, 999);
        return d >= s && d <= en;
      }
      if (startDate) {
        return d >= new Date(startDate);
      }
      if (endDate) {
        const en = new Date(endDate);
        en.setHours(23, 59, 59, 999);
        return d <= en;
      }
      return true;
    });
  };

  const filteredExpenses = getFilteredByDate();

  const categorySummary = filteredExpenses.reduce((acc, expense) => {
    const cat = expense.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + expense.amount;
    return acc;
  }, {});

  const summaryTotal = Object.values(categorySummary).reduce((a, b) => a + b, 0);

  const handleApplyDate = () => {
    setDateApplied(true);
  };

  const handleClearDate = () => {
    setStartDate("");
    setEndDate("");
    setDateApplied(false);
  };

  const getDateLabel = () => {
    if (!dateApplied || (!startDate && !endDate)) return "All Time";
    if (startDate && endDate) return `${startDate} to ${endDate}`;
    if (startDate) return `From ${startDate}`;
    return `Until ${endDate}`;
  };

  return (
    <div className="dashboard">
      <Navbar
        currentUser={currentUser}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
      />

      {showSummary && (
        <div className="summary-overlay" onClick={() => setShowSummary(false)}>
          <div className="summary-card" onClick={(e) => e.stopPropagation()}>
            <h3>Spending by Category</h3>

            <div className="date-range-picker">
              <div className="date-input-group">
                <label>
                  <svg className="date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Start
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="date-input-group">
                <label>
                  <svg className="date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  End
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="date-actions">
                <button className="apply-date-btn" onClick={handleApplyDate}>Apply</button>
                {dateApplied && (
                  <button className="clear-date-btn" onClick={handleClearDate}>Clear</button>
                )}
              </div>
            </div>

            <p className="date-label">Range: {getDateLabel()}</p>

            {Object.keys(categorySummary).length === 0 ? (
              <p>No expenses in this date range.</p>
            ) : (
              <>
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categorySummary)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => (
                        <tr key={category}>
                          <td>{category}</td>
                          <td>{amount}</td>
                          <td>
                            {summaryTotal > 0
                              ? ((amount / summaryTotal) * 100).toFixed(1)
                              : 0}
                            %
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="total-cell">Total</td>
                      <td className="total-cell">{summaryTotal}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                <button
                  className="close-summary-btn"
                  onClick={() => setShowSummary(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="budget-section">
        <BudgetCard salary={salary} setSalary={setSalary} totalSpent={totalSpent} />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <ExpenseForm
            key={editIndex ?? "new"}
            addExpense={addExpense}
            editData={editIndex !== null ? expenses[editIndex] : null}
            updateExpense={updateExpense}
            cancelEdit={cancelEdit}
          />
        </div>
        <div className="dashboard-right">
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

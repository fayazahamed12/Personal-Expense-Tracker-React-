import { useState } from "react";

const BudgetCard = ({ salary, setSalary, totalSpent }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(salary || "");

  const save = (e) => {
    e.preventDefault();
    const val = Number(input);
    if (val > 0) {
      setSalary(val);
      setEditing(false);
    }
  };

  const balance = (salary || 0) - totalSpent;
  const spentPercent = salary > 0 ? Math.min((totalSpent / salary) * 100, 100) : 0;

  return (
    <div className="budget-card">
      <div className="budget-header">
        <h3>Weekly Budget</h3>
        {!editing && (
          <button className="edit-budget-btn" onClick={() => setEditing(true)}>
            {salary ? "Update" : "Set Salary"}
          </button>
        )}
      </div>

      {editing ? (
        <form className="budget-form" onSubmit={save}>
          <input
            type="number"
            placeholder="Enter weekly salary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            min="0"
            required
          />
          <div className="budget-form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="budget-stats">
          <div className="budget-stat">
            <span className="stat-label">Budget</span>
            <span className="stat-value salary-value">{salary || 0}</span>
          </div>
          <div className="budget-stat">
            <span className="stat-label">Spent</span>
            <span className="stat-value spent-value">{totalSpent}</span>
          </div>
          <div className="budget-stat">
            <span className="stat-label">Balance</span>
            <span className={`stat-value ${balance < 0 ? "negative" : "positive"}`}>
              {balance}
            </span>
          </div>
        </div>
      )}

      {salary > 0 && !editing && (
        <div className="budget-progress">
          <div className="progress-bar">
            <div
              className={`progress-fill ${spentPercent > 90 ? "danger" : spentPercent > 70 ? "warning" : ""}`}
              style={{ width: `${spentPercent}%` }}
            />
          </div>
          <span className="progress-text">{spentPercent.toFixed(1)}% spent</span>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;

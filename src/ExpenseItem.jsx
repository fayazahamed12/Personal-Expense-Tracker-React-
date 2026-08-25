const ExpenseItem = ({ expense, index, deleteExpense, editExpense }) => {
  return (
    <tr>
      <td>{expense.title}</td>
      <td>{expense.amount}</td>
      <td>{expense.category}</td>
      <td>{expense.date}</td>
      <td className="action-cell">
        <button className="action-btn edit-action" onClick={() => editExpense(index)} title="Edit">
          <span className="btn-text">Edit</span>
          <span className="btn-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </span>
        </button>
        <button className="action-btn delete-action" onClick={() => deleteExpense(index)} title="Delete">
          <span className="btn-text">Delete</span>
          <span className="btn-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </span>
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;

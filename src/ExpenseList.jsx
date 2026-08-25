import ExpenseItem from "./ExpenseItem.jsx";

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  return (
    <div className="expense-list-wrapper">
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <ExpenseItem
                key={index}
                expense={expense}
                index={index}
                deleteExpense={deleteExpense}
                editExpense={editExpense}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;

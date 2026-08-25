import { useState } from "react";

const ExpenseForm = ({ addExpense, editData, updateExpense, cancelEdit }) => {
  const [title, setTitle] = useState(editData?.title || "");
  const [amount, setAmount] = useState(editData?.amount || "");
  const [category, setCategory] = useState(editData?.category || "");

  const submit = (e) => {
    e.preventDefault();

    if (editData) {
      updateExpense({
        title,
        amount: Number(amount),
        category,
        date: editData.date,
      });
    } else {
      addExpense({
        title,
        amount: Number(amount),
        category,
        date: new Date().toLocaleDateString(),
      });
    }

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleCancel = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    cancelEdit();
  };

  return (
    <div className="formq">
      <div id="form">
        <form onSubmit={submit}>
          <label htmlFor="">Name of product :</label>
          <br />
          <input
            className="form-control ps-2 w-75 ms-5"
            placeholder="Product Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="">Amount :</label>
          <br />
          <input
            className="form-control ps-2 w-75 ms-5"
            type="number"
            placeholder="Amount of product"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <br />
          <label htmlFor="">Category :</label>
          <br />
          <input
            className="form-control ps-2 w-75 ms-5"
            placeholder="Category of product"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <br />
          <div id="button">
            <button>{editData ? "Update Expense" : "Add Expense"}</button>
          </div>
          {editData && (
            <div className="cancel-edit">
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;

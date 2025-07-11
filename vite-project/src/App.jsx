import { useState } from "react";
import "./App.css";

const categories = ["Food", "Transportation", "Utilities", "Other"];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: categories[0],
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || isNaN(Number(form.amount))) return;
    if (editIndex !== null) {
      const updated = expenses.map((exp, idx) =>
        idx === editIndex ? { ...form, amount: parseFloat(form.amount) } : exp
      );
      setExpenses(updated);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, { ...form, amount: parseFloat(form.amount) }]);
    }
    setForm({ name: "", amount: "", category: categories[0] });
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setForm({ ...expenses[idx], amount: String(expenses[idx].amount) });
  };

  const handleDelete = (idx) => {
    setExpenses(expenses.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setForm({ name: "", amount: "", category: categories[0] });
    }
  };

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Expense Tracker</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          name="name"
          placeholder="Expense Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          min="0"
          step="0.01"
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"} Expense
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {expenses.map((exp, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span style={{ flex: 1 }}>
              {exp.name} - ${exp.amount.toFixed(2)} [{exp.category}]
            </span>
            <button onClick={() => handleEdit(idx)} style={{ fontSize: 12 }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(idx)}
              style={{ fontSize: 12, color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default App;

import { useState, useEffect, useCallback } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SearchBar from "./components/SearchBar";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./api/api";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({ description: "", type: "" });

  const loadTransactions = useCallback(async (params) => {
    setLoading(true);
    setError("");
    try {
      const res = await getTransactions(params);
      setTransactions(res.data);
    } catch (err) {
      setError("Could not load transactions. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    loadTransactions(newFilters);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        const { _id, ...body } = data;
        await updateTransaction(_id, body);
      } else {
        await createTransaction(data);
      }
      setEditingTransaction(null);
      loadTransactions(filters);
    } catch (err) {
      setError(
        "Could not save the transaction. Please check the fields and try again.",
      );
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => setEditingTransaction(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction? This cannot be undone."))
      return;
    try {
      await deleteTransaction(id);
      loadTransactions(filters);
    } catch (err) {
      setError("Could not delete the transaction.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transaction Manager</h1>
        <p>
          Track income and expenses — create, update, delete, search, and view.
        </p>
      </header>

      {error && <p className="banner-error">{error}</p>}

      <main className="app-main">
        <section className="panel">
          <TransactionForm
            editingTransaction={editingTransaction}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="panel">
          <SearchBar onSearch={handleSearch} />
          <TransactionList
            transactions={transactions}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

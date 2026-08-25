import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({
  transactions,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className="status-message">Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p className="status-message">No transactions found.</p>;
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="transaction-list">
      <div className="summary">
        <div className="summary-item">
          <span>Income</span>
          <strong className="amount-income">${totalIncome.toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Expense</span>
          <strong className="amount-expense">${totalExpense.toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Balance</span>
          <strong>${(totalIncome - totalExpense).toFixed(2)}</strong>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionItem
              key={t._id}
              transaction={t}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Transaction = require("../models/Transaction");

async function createTransaction(req, res) {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(`Created: ${transaction}`);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getTransactions(req, res) {
  try {
    const { description, type, startDate, endDate } = req.query;
    const filter = {};

    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    if (type) {
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTransactionById(req, res) {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateTransaction(req, res) {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};

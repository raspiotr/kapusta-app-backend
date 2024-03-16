const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");
const updateBalanceAfterNewTransaction = require("../../helpers/updateBalanceAfterNewTransaction");

const addTransaction = async (req, res) => {
  const owner = req.user._id;
  const { balance } = req.user;

  const transactionType = req.params.transactionType.toLowerCase();

  if (transactionType !== "income" && transactionType !== "expense") {
    return res.status(400).json({
      message: "Transaction type must be 'income' or 'expense'.",
    });
  }

  const { day, month, year, description, category, amount } = req.body;

  const newBalance = updateBalanceAfterNewTransaction(
    transactionType,
    balance,
    amount
  );

  if (newBalance < 0) {
    return res
      .status(400)
      .json({ message: "The balance must not be less than 0." });
  }

  await User.findByIdAndUpdate(owner, {
    balance: newBalance,
  });

  const newTransaction = new Transaction({
    transactionType,
    ...req.body,
    owner,
  });
  await newTransaction.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction: {
        _id: newTransaction._id,
        transactionType,
        day: newTransaction.day,
        month: newTransaction.month,
        year: newTransaction.year,
        description: newTransaction.description,
        category: newTransaction.category,
        amount: newTransaction.amount,
      },
    },
  });
};

module.exports = addTransaction;

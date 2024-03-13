const { Transaction } = require("../../models/transaction");

const addTransaction = async (req, res) => {
  const { transactionType } = req.params;
  const { day, month, year, description, category, amount } = req.body;
  const newTransaction = {
    transactionType,
    ...req.body,
  };
  await Transaction.create(newTransaction);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction: {
        transactionType,
        day,
        month,
        year,
        description,
        category,
        amount,
      },
    },
  });
};

module.exports = addTransaction;

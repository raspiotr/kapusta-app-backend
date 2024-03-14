const { Transaction } = require("../../models/transaction");

const getAllTransactions = async (req, res) => {
  const transactionsList = await Transaction.find();

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsList,
  });
};

module.exports = getAllTransactions;

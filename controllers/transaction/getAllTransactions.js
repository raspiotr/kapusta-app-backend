const { Transaction } = require("../../models/transaction");

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;
  const transactionsList = await Transaction.find({ owner: _id });

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsList,
  });
};

module.exports = getAllTransactions;

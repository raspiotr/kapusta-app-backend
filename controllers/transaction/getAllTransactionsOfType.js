const { Transaction } = require("../../models/transaction");

const getAllTransactionsOfType = async (req, res) => {
  const { _id } = req.user;
  const transactionType = req.params.transactionType.toLowerCase();

  if (transactionType !== "income" && transactionType !== "expense") {
    return res.status(404).json({
      message: "Not found. Transaction type must be 'income' or 'expense'.",
    });
  }

  const transactionsOfTypeList = await Transaction.find({
    transactionType,
    owner: _id,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsOfTypeList,
  });
};

module.exports = getAllTransactionsOfType;

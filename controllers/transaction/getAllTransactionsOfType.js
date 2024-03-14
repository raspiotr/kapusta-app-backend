const { Transaction } = require("../../models/transaction");

const getAllTransactionsOfType = async (req, res) => {
  const { transactionType } = req.params;

  const transactionsOfTypeList = await Transaction.find({ transactionType });

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsOfTypeList,
  });
};

module.exports = getAllTransactionsOfType;

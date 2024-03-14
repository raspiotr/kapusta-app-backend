const { Transaction } = require("../../models/transaction");
const { isValidObjectId } = require("mongoose");

const removeTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  if (!isValidObjectId(transactionId)) {
    return res
      .status(404)
      .json({ message: `Not found. ID = ${transactionId} is not valid ID` });
  }

  const selectedTransaction =
    (await Transaction.findByIdAndDelete({
      _id: transactionId,
    })) || null;

  if (!selectedTransaction) {
    return res
      .status(404)
      .json({ message: `Not found transaction with ID = ${transactionId}` });
  }

  res.status(200).json({ message: `Transaction deleted` });
};

module.exports = removeTransactionById;

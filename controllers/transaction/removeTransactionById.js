const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");
const { isValidObjectId } = require("mongoose");
const updateBalanceAfterDeleteTransaction = require("../../helpers/updateBalanceAfterDeleteTransaction");

const removeTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  if (!isValidObjectId(transactionId)) {
    return res
      .status(404)
      .json({ message: `Not found. ID = ${transactionId} is not valid ID` });
  }

  const selectedTransaction =
    (await Transaction.findById({
      _id: transactionId,
    })) || null;

  if (!selectedTransaction) {
    return res
      .status(404)
      .json({ message: `Not found transaction with ID = ${transactionId}` });
  }

  const { amount, transactionType } = selectedTransaction;

  //Aktualnie wstawiamy na sztywno ID użytkownika
  const _id = "65f2e3e83c3bd948dae62781";
  const { balance } = await User.findById(_id);
  const newBalance = updateBalanceAfterDeleteTransaction(
    transactionType,
    balance,
    amount
  );

  if (newBalance < 0) {
    return res
      .status(400)
      .json({ message: "The balance must not be less than 0." });
  }

  await User.findByIdAndUpdate(_id, {
    balance: newBalance,
  });
  await Transaction.findByIdAndDelete({
    _id: transactionId,
  });

  res.status(200).json({ message: `Transaction deleted` });
};

module.exports = removeTransactionById;

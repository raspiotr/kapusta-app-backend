const updateBalanceAfterDeleteTransaction = (
  transactionType,
  oldBalance,
  amount
) => {
  const newBalance =
    transactionType === "expense"
      ? oldBalance + Math.abs(Number(amount))
      : oldBalance - Math.abs(Number(amount));
  return newBalance;
};

module.exports = updateBalanceAfterDeleteTransaction;

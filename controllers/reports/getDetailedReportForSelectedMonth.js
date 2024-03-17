const { Transaction } = require("../../models/transaction");

const getDetailedReportForSelectedMonth = async (req, res) => {
  const transactionType = req.params.transactionType.toLowerCase();
  const { year, month } = req.params;

    if (transactionType !== "income" && transactionType !== "expense") {
      return res.status(404).json({
        message: "Transaction type must be 'income' or 'expense'.",
      });
    }

  const transactionsOfTypeSelectedMonth = await Transaction.find({
    year,
    month,
    transactionType,
  });

  const filteredTransactions = transactionsOfTypeSelectedMonth.filter(transaction => transaction.transactionType === transactionType);
 
  let total = 0;
  
  const summary = filteredTransactions.reduce((acc, transaction) => {
    const { category, description, amount } = transaction;

    const descriptionLowerCase = description.toLowerCase();

    total += amount;

    if (!acc[category]) {
      acc[category] = { total: 0, descriptions: {} };
    }
    if (!acc[category].descriptions[descriptionLowerCase]) {
      acc[category].descriptions[descriptionLowerCase] = 0;
    }

    acc[category].total += amount;
    acc[category].descriptions[descriptionLowerCase] += amount;

    return acc;
  }, {});

  
  const responseData = Object.entries(summary).map(([category, data]) => ({
    category,
    total: data.total,
    descriptions: Object.entries(data.descriptions).map(([description, sum]) => ({
      description,
      sum
    }))
  }));

  const totalResponse = transactionType === 'income' ? { totalIncome: total } : { totalExpense: total };

  res.status(200).json({
    status: "success",
    code: 200,
    data: responseData,
    ...totalResponse,
  });
};

module.exports = getDetailedReportForSelectedMonth;

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

 
  const summary = transactionsOfTypeSelectedMonth.reduce((acc, transaction) => {
    const { category, description, amount } = transaction;

    if (!acc[category]) {
      acc[category] = { total: 0, descriptions: {} };
    }
    if (!acc[category].descriptions[description]) {
      acc[category].descriptions[description] = 0;
    }

    acc[category].total += amount;
    acc[category].descriptions[description] += amount;

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

  res.status(200).json({
    status: "success",
    code: 200,
    data: responseData,
  });
};

module.exports = getDetailedReportForSelectedMonth;

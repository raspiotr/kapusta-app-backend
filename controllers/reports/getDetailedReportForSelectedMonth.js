const { Transaction } = require("../../models/transaction");
const { TransactionCategory } = require("../../models/transactionCategories");

const getDetailedReportForSelectedMonth = async (req, res) => {
  const owner = req.user._id;

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
    owner,
  });

  const filteredTransactions = transactionsOfTypeSelectedMonth.filter(
    (transaction) => transaction.transactionType === transactionType
  );

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
    descriptions: Object.entries(data.descriptions).map(
      ([description, sum]) => ({
        description,
        sum,
      })
    ),
  }));

  const transactionCategories = await TransactionCategory.find();

  const responseDataWithImgs = responseData.map((categoryData) => {
    const category = transactionCategories.find(
      (c) =>
        c.categoryName.toLowerCase() === categoryData.category.toLowerCase()
    );
    return {
      categoryImageUrl: category.categoryImageUrl,
      ...categoryData,
    };
  });

  const totalResponse =
    transactionType === "income"
      ? { totalIncome: Number(total.toFixed(2)) }
      : { totalExpense: Number(total.toFixed(2)) };

  res.status(200).json({
    status: "success",
    code: 200,
    ...totalResponse,
    data: responseDataWithImgs,
  });
};

module.exports = getDetailedReportForSelectedMonth;

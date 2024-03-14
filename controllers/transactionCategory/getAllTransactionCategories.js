const { TransactionCategory } = require("../../models/transactionCategories");

const getAllTransactionCategories = async (req, res) => {
  const categoriesList = await TransactionCategory.find();

  res.status(200).json({
    status: "success",
    code: 200,
    data: categoriesList,
  });
};

module.exports = getAllTransactionCategories;

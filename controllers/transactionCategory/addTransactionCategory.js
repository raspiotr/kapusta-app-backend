const { TransactionCategory } = require("../../models/transactionCategories");

const addTransactionCategory = async (req, res) => {
  const { categoryName, categoryType, categoryImageUrl } = req.body;
  const newCategory = {
    ...req.body,
  };
  await TransactionCategory.create(newCategory);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      category: {
        categoryName,
        categoryType,
        categoryImageUrl,
      },
    },
  });
};

module.exports = addTransactionCategory;

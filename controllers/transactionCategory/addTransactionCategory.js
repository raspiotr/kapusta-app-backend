const { TransactionCategory } = require("../../models/transactionCategories");

const addTransactionCategory = async (req, res) => {
  const { pass } = req.body;

  if (pass !== process.env.CATEGORY_PASS) {
    return res.status(401).json({
      status: "error",
      message: "You can't add category. Pass is invalid.",
      data: "Unauthorized",
    });
  }

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

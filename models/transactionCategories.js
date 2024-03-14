const { Schema, model } = require("mongoose");

const transactionCategorySchema = Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    categoryType: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Category type is required"],
    },
    categoryImageUrl: {
      type: String,
      required: [true, "Category image URL is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const TransactionCategory = model(
  "transactionCategory",
  transactionCategorySchema
);

module.exports = { TransactionCategory };

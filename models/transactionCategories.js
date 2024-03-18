const { Schema, model } = require("mongoose");
const Joi = require("joi");

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

const addCategorySchema = Joi.object({
  categoryName: Joi.string().required().messages({
    "any.required": "'categoryName' is required",
  }),
  categoryType: Joi.string().valid("income", "expense").required().messages({
    "any.required":
      "'categoryType' is required - acceptable 'income' and 'expense' only",
  }),
  categoryImageUrl: Joi.string().required().messages({
    "any.required": "'categoryImageUrl' is required",
  }),
  pass: Joi.string().required().messages({
    "any.required": "This secret 'pass' i required to add category",
  }),
});

module.exports = { TransactionCategory, addCategorySchema };

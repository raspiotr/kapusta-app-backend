const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");
const categoryNames = require("../constants/categories");

const transactionSchema = Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    month: {
      type: Number,
      required: [true, "Month is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      lowercase: true,
      required: [true, "Category is required"],
    },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transactions is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      //     required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

const addTransactionSchema = Joi.object({
  day: Joi.number().required().integer().min(1).max(31).messages({
    "any.required":
      '"Day" is required and must be an integer between 1 and 31.',
  }),
  month: Joi.number().required().integer().min(1).max(12).messages({
    "any.required":
      '"Month" is required and must be an integer between 1 and 12.',
  }),
  year: Joi.number()
    .required()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .messages({
      "any.required":
        '"Year" is required and must be in a valid YYYY format (e.g. 2024).',
    }),
  description: Joi.string().required().messages({
    "any.required": '"Description" is required',
  }),
  category: Joi.string()
    .valid(...categoryNames)
    .lowercase()
    .required()
    .messages({
      "any.required": '"Category" is required',
    }),
  amount: Joi.number().required().min(0).messages({
    "any.required": '"Amount" is required and must be a positive number.',
  }),
});

module.exports = { Transaction, addTransactionSchema };

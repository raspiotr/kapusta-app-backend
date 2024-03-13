const { Schema, SchemaTypes, model } = require("mongoose");

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

module.exports = { Transaction };

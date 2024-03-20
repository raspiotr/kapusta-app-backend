const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const updateBalanceSchema = Joi.object({
  balance: Joi.number().required().min(0).messages({
    "any.required": "'Balance' is required and must be a positive number.",
  }),
});

module.exports = { User, updateBalanceSchema };

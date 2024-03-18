const express = require("express");
const router = express.Router();

const addTransactionCategory = require("../../controllers/transactionCategory/addTransactionCategory");
const getAllTransactionCategories = require("../../controllers/transactionCategory/getAllTransactionCategories");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const validateBody = require("../../middlewares/validateBody");
const { addCategorySchema } = require("../../models/transactionCategories");

router.post(
  "/",
  validateBody(addCategorySchema),
  ctrlWrapper(addTransactionCategory)
);
router.get("/", ctrlWrapper(getAllTransactionCategories));

module.exports = router;

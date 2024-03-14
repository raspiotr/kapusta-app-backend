const express = require("express");
const router = express.Router();

const addTransactionCategory = require("../../controllers/transactionCategory/addTransactionCategory");
const getAllTransactionCategories = require("../../controllers/transactionCategory/getAllTransactionCategories");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

router.post("/", ctrlWrapper(addTransactionCategory));
router.get("/", ctrlWrapper(getAllTransactionCategories));

module.exports = router;

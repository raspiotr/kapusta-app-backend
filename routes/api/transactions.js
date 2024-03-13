const express = require("express");
const router = express.Router();

const addTransaction = require("../../controllers/transaction/addTransaction");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

router.post("/:transactionType", ctrlWrapper(addTransaction));

module.exports = router;

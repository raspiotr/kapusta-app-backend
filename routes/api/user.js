const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const validateBody = require("../../middlewares/validateBody");
const updateBalance = require("../../controllers/user/updateBalance");
const getBalance = require("../../controllers/user/getBalance");
const { updateBalanceSchema } = require("../../models/user");

router.patch(
  "/balance",
  validateBody(updateBalanceSchema),
  ctrlWrapper(updateBalance)
);
router.get("/balance", ctrlWrapper(getBalance));

module.exports = router;

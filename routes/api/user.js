const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const updateBalance = require("../../controllers/user/updateBalance");
const getBalance = require("../../controllers/user/getBalance");

router.patch("/balance", ctrlWrapper(updateBalance));
router.get("/balance", ctrlWrapper(getBalance));

module.exports = router;

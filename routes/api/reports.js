const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const getSummaryByMonthsThisYearReport = require("../../controllers/reports/getSummaryByMonthsThisYearReport");
const getDetailedReportForSelectedMonth = require("../../controllers/reports/getDetailedReportForSelectedMonth");

router.get("/:transactionType", ctrlWrapper(getSummaryByMonthsThisYearReport));
router.get(
  "/:transactionType/:year/:month",
  ctrlWrapper(getDetailedReportForSelectedMonth)
);

module.exports = router;

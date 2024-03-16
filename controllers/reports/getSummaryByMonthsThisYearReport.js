const { Transaction } = require("../../models/transaction");

const getSummaryByMonthsThisYearReport = async (req, res) => {
  const transactionType = req.params.transactionType.toLowerCase();
  if (transactionType !== "income" && transactionType !== "expense") {
    return res.status(404).json({
      message: "Transaction type must be 'income' or 'expense'.",
    });
  }

  const thisYear = new Date().getFullYear();


  try {
    const monthlySummary = await Transaction.aggregate([
      {
        $match: {
          year: thisYear,
          transactionType,
        },
      },
      {
        $group: {
          _id: "$month", 
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    
    const formattedSummary = monthlySummary.map(item => ({
      month: monthNames[item._id - 1],
      total: item.total,
    }));

    res.status(200).json({
      status: "success",
      code: 200,
      data: formattedSummary,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server Error",
      details: error.message,
    });
  }
};

module.exports = getSummaryByMonthsThisYearReport;

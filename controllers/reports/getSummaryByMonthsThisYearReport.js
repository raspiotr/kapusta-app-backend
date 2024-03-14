const { Transaction } = require("../../models/transaction");

const getSummaryByMonthsThisYearReport = async (req, res) => {
  const { transactionType } = req.params;

  const thisYear = new Date().getFullYear();

  const transactionsOfTypeThisYear = await Transaction.find({
    year: thisYear,
    transactionType,
  });

  // Trzeba dopisać funkcjonalność, która pozyska to co chcemy mieć w raporcie,
  // czyli suma wydatków / dochodów w poszczególne miesiące obecnego roku
  // Aktualnie jest realizowany wybór typu transakcji (przychody lub wydatki) i obecnego roku

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsOfTypeThisYear,
  });
};

module.exports = getSummaryByMonthsThisYearReport;

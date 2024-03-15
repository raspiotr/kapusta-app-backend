const { Transaction } = require("../../models/transaction");

const getDetailedReportForSelectedMonth = async (req, res) => {
  const { transactionType, year, month } = req.params;

  const transactionsOfTypeSelectedMonth = await Transaction.find({
    year,
    month,
    transactionType,
  });

  // Trzeba dopisać funkcjonalność, która pozyska to co chcemy mieć w raporcie, czyli
  // - wydatki / przychody z rozbiciem na kategorie
  // - suma tych wydatków / przychodów
  // Aktualnie jest realizowany wybór typu transakcji (przychody lub wydatki), wybór roku, wybór miesiąca

  res.status(200).json({
    status: "success",
    code: 200,
    data: transactionsOfTypeSelectedMonth,
  });
};

module.exports = getDetailedReportForSelectedMonth;

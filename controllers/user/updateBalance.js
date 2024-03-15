const { User } = require("../../models/user");

const updateBalance = async (req, res) => {
  //Aktualnie wstawiamy na sztywno ID użytkownika
  const _id = "65f2e3e83c3bd948dae62781";
  const { balance } = req.body;

  await User.findByIdAndUpdate(_id, { balance });
  res.status(200).json({
    status: "success",
    code: 200,
    balance,
  });
};

module.exports = updateBalance;

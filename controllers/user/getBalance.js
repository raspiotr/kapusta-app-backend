const { User } = require("../../models/user");

const getBalance = async (req, res) => {
  //Aktualnie wstawiamy na sztywno ID użytkownika
  const _id = "65f2e3e83c3bd948dae62781";

  const { balance } = await User.findById(_id);
  res.status(200).json({
    status: "success",
    code: 200,
    balance,
  });
};

module.exports = getBalance;

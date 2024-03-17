const { User } = require("../../models/user");

const updateBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  await User.findByIdAndUpdate(_id, { balance });
  res.status(200).json({
    status: "success",
    code: 200,
    balance: Number(balance),
  });
};

module.exports = updateBalance;

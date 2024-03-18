const currentUser = async (req, res) => {
  const { name, email, balance, avatarUrl } = req.user;

  return res
    .status(200)
    .json({ name, email, balance: Number(balance.toFixed(2)), avatarUrl });
};

module.exports = currentUser;

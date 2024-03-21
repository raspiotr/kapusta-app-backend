const currentUser = async (req, res) => {
  const { name, email, token, balance, avatarUrl } = req.user;

  return res.status(200).json({
    message: "Current user authenticated.",
    token,
    user: {
      name,
      email,
      balance,
      avatarUrl,
    },
  });
};

module.exports = currentUser;

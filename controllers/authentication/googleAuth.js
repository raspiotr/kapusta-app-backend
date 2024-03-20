const googleAuth = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }

  const response = {
    message: "The user has been successfully logged in.",
    token: user.token,
    user: {
      name: user.name,
      email: user.email,
      balance: user.balance,
      avatarUrl: user.avatarUrl,
    },
  };
  //console.log(response);
  res.status(200).json(response);
  // przekierowanie na stronę transakcji po udanym uwierzytelnieniu
  //res.redirect(process.env.FRONTEND_URL);
};

module.exports = googleAuth;

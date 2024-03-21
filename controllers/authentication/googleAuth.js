const googleAuth = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }

  // const response = {
  //   message: "The user has been successfully logged in.",
  //   token: user.token,
  //   user: {
  //     name: user.name,
  //     email: user.email,
  //     balance: user.balance,
  //     avatarUrl: user.avatarUrl,
  //   },
  // };
  //res.status(200).json(response);

  // przypisanie tokena do headera
  res.header("AuthToken", user.token);
  // przekierowanie na stronę pobrania danych użytkownika poprzez token
  res.redirect(`${process.env.FRONTEND_URL}/user-check`);
};

module.exports = googleAuth;

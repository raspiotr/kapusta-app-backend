const googleAuth = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }

  res.cookie("user", user);
  // przekierowanie na stronę pobrania danych użytkownika poprzez token
  res.redirect(`${process.env.FRONTEND_URL}/user-check`);
};

module.exports = googleAuth;

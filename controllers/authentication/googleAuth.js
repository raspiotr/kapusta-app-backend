const googleAuth = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }

  // przekierowanie na stronę pobrania danych użytkownika poprzez token
  res.redirect(`${process.env.FRONTEND_URL}/user-check?token=${user.token}`);
};

module.exports = googleAuth;

const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
};

module.exports = authenticateToken;

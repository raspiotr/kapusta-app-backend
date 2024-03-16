const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const { JWT_SECRET } = process.env;

//  TU TEZ PONIZEJ COS NIEGRALO WIEC ZAKOMEWWNTOWALEM SPRAWDZCIE CO JEST OK

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
// =======
// const authenticateToken = (req, res, next) => {
//   // Pobranie tokenu z nagłówka Authorization
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     // Brak tokenu , wówczas 401 (unauthorized)
//     if (!token) {
//         return res
//             .sendStatus(401)
//             .json({ message: "Unauthorized - Token missing" });
//     }

//     // spr. tokenu
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//         return res
//             .sendStatus(401)
//             .json({ message: "Unauthorized - Invalid token" });
//         }
//         // token jest ok - jest możliwy dostęp do chronionej trasy, przekazanie kontroli do następnego middleware
//         req.user = decoded.userId;
//         next();
// >>>>>>> main
    });
  }
};

module.exports = authenticateToken;

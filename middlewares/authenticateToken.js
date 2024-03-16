const jwt = require("jsonwebtoken");

//  uwierzytelnienie tokena
const authenticateToken = (req, res, next) => {
  // Pobranie tokenu z nagłówka Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // Brak tokenu , wówczas 401 (unauthorized)
    if (!token) {
        return res
            .sendStatus(401)
            .json({ message: "Unauthorized - Token missing" });
    }

    // spr. tokenu
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res
            .sendStatus(401)
            .json({ message: "Unauthorized - Invalid token" });
        }
        // token jest ok - jest możliwy dostęp do chronionej trasy, przekazanie kontroli do następnego middleware
        req.user = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;

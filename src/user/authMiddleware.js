const jwt = require("jsonwebtoken");
const queries = require("./queries");
const pool = require("../../db");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  pool.query(queries.isTokenBlacklisted, [token], (error, results) => {
    if (results.rows.length) {
      return res.sendStatus(403);
    }

    jwt.verify(token, "your_jwt_secret", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  });
};

module.exports = authenticateToken;

const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const register = (req, res) => {
  const { role, name, email, phone, country, password } = req.body;
  pool.query(
    queries.isEmailPhoneExists,
    [email, phone],
    async (error, results) => {
      if (results.rows.length) {
        return res.send("Қолданушы жүйеде тіркелген!");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      pool.query(
        "INSERT INTO users (role, name, email, phone, country, password) VALUES ($1, $2, $3, $4, $5, $6)",
        [role, name, email, phone, country, hashedPassword],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send("Қолданушы тіркелді!");
        }
      );
    }
  );
};

const login = (req, res) => {
  const { phone, password } = req.body;
  pool.query(queries.isUserExists, [phone], async (error, results) => {
    if (!results.rows.length) {
      return res.send("Нөмір немесе құпиясөз қате жазылды!");
    }

    const user = results.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.send("Нөмір немесе құпиясөз қате жазылды!");
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
};

const logout = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const expiresAt = moment.unix(decodedToken.exp).toISOString();

  pool.query(queries.blacklistToken, [token, expiresAt], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).send("Logout successful");
  });
};

const changeRole = (req, res) => {
  pool.query(queries.changeRole, [token, expiresAt], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).send("Нұсқаңыз өзгертілді!");
  });
};

const activateAccount = (req, res) => {
  const { id, paymentOption } = req.body;

  pool.query(
    queries.updateActivation,
    [paymentoption, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Server error" });
      }
      res.status(200).send("Account activated successfully!");
    }
  );
};

const getActivationExpiry = (req, res) => {
  const { userId } = req.body;

  pool.query(queries.getActivationExpiry, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Server error" });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const expiryDate = results.rows[0].account_activated_until;
    res.status(200).json({ expiryDate });
  });
};

module.exports = {
  register,
  login,
  logout,
  changeRole,
  activateAccount,
  getActivationExpiry,
};

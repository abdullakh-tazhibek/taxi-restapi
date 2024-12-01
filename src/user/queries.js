const isEmailPhoneExists = "SELECT * FROM users WHERE email = $1 OR phone = $2";
const isUserExists = "SELECT * FROM users WHERE phone = $1";
const blacklistToken =
  "INSERT INTO token_blacklist (token, expires_at) VALUES ($1, $2)";
const isTokenBlacklisted = "SELECT * FROM token_blacklist WHERE token = $1";
const changeRole =
  "UPDATE users SET role = CASE WHEN role = 'жолаушы' THEN 'жүргізуші' WHEN role = 'жүргізуші' THEN 'жолаушы' ELSE role END WHERE id = $1;";
const updateActivation = `
  UPDATE users
  SET account_activated_until = NOW() + INTERVAL CASE 
    WHEN $1 = '1 day' THEN '1 day'
    WHEN $1 = '3 days' THEN '3 days'
    WHEN $1 = '7 days' THEN '7 days'
  END
  WHERE id = $2;
`;
const updatePaidStatus = `
  UPDATE users
  SET paid = $1
  WHERE id = $2;
`;
const getActivationExpiry = `
  SELECT account_activated_until
  FROM users
  WHERE id = $1;
`;

module.exports = {
  changeRole,
  isEmailPhoneExists,
  isUserExists,
  blacklistToken,
  isTokenBlacklisted,
  updateActivation,
  updatePaidStatus,
  getActivationExpiry,
};

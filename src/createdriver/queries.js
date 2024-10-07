const createOrder =
  "INSERT INTO createdriver (location1, location2, count, date, comment, price) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteExpOrder = "DELETE FROM createdriver WHERE date < CURRENT_DATE";
const deleteByUser = "DELETE FROM createdriver WHERE user_id = $1";
const getDriverList = "SELECT * FROM createdriver";
const getDriverOrder = "SELECT * FROM createdriver WHERE user_id = $1";

module.exports = {
  createOrder,
  deleteExpOrder,
  deleteByUser,
  getDriverList,
  getDriverOrder,
};

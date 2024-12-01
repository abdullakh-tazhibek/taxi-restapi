const createOrder =
  "INSERT INTO createpass (location1, location2, count, date, comment, price, option) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const deleteExpOrder = "DELETE FROM createpass WHERE date < CURRENT_DATE";
const deleteByUser = "DELETE FROM createpass WHERE user_id = $1";
const getPassList = "SELECT * FROM createpass";
const getPassOrder = "SELECT * FROM createpass WHERE user_id = $1";

module.exports = {
  createOrder,
  deleteExpOrder,
  deleteByUser,
  getPassList,
  getPassOrder,
};

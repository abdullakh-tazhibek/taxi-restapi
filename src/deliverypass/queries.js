const createOrder =
  "INSERT INTO deliverypass (location1, location2, date, comment, price, option) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteExpOrder = "DELETE FROM deliverypass WHERE date < CURRENT_DATE";
const deleteByUser = "DELETE FROM deliverypass WHERE user_id = $1";
const getOrders = "SELECT * FROM deliverypass";
const getDeliveryOrder = "SELECT * FROM deliverypass WHERE user_id = $1";

module.exports = {
  createOrder,
  deleteExpOrder,
  deleteByUser,
  getOrders,
  getDeliveryOrder,
};

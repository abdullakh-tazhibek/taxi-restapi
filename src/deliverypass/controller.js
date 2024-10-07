const pool = require("../../db");
const queries = require("./queries");
const cron = require("node-cron");

// Schedule task to run every day at midnight
cron.schedule("0 0 * * *", () => {
  pool.query(queries.deleteExpOrder, (error, results) => {
    if (error) {
      console.error("Error deleting expired orders:", error);
    } else {
      console.log("Expired orders deleted successfully");
    }
  });
});

const createOrder = async (req, res) => {
  const { location1, location2, date, comment, price } = req.body;
  try {
    await pool.query(queries.createOrder, [
      location1,
      location2,
      date,
      comment,
      price,
    ]);
    res.status(201).send("Сіздің тапсырысыңыз сәтті жарияланды!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Тапсырыста қателік бар!" });
  }
};

const deleteExpOrder = (req, res) => {
  pool.query(queries.deleteExpOrder, [date], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const deleteByUser = (req, res) => {
  pool.query(queries.deleteByUser, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getOrders = (req, res) => {
  pool.query(queries.getOrders, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getDeliveryOrder = (req, res) => {
  pool.query(queries.getDeliveryOrder, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  createOrder,
  deleteExpOrder,
  deleteByUser,
  getOrders,
  getDeliveryOrder,
};

const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/user/routes");
const createpass = require("./src/createpass/routes");
const deliverypass = require("./src/deliverypass/routes");
const createdriver = require("./src/createdriver/routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, oki doki!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/createpass", createpass);
app.use("/api/v1/deliverypass", deliverypass);
app.use("/api/v1/createdriver", createdriver);

app.listen(port, "0.0.0.0", () =>
  console.log(`App is listening on port ${port}`)
);

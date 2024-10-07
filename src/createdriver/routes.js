const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createOrder);

router.delete("/expired", controller.deleteExpOrder);
router.delete("/:userId", controller.deleteByUser);

router.get("/", controller.getDriverList);
router.get("/:userId", controller.getDriverOrder);

module.exports = router;

const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.createOrder);

router.delete("/expired", controller.deleteExpOrder);
router.delete("/:userId", controller.deleteByUser);

router.get("/", controller.getOrders);
router.get("/:userId", controller.getDeliveryOrder);

module.exports = router;

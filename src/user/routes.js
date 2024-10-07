const { Router } = require("express");
const router = Router();
const controller = require("./controller");
const authenticateToken = require("./authMiddleware");

router.post("/register", controller.register);
router.get("/register", controller.login);
router.post("/logout", controller.logout);
router.put("/changerole", controller.changeRole);
router.post("/activate", controller.activateAccount);
router.post("/activation-expiry", controller.getActivationExpiry);

router.get("/", controller.getData);

module.exports = router;

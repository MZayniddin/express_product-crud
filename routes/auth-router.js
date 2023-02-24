const { Router } = require("express");

// INIT ROUTER
const router = Router();

// IMPORT CONTROLLER
const authCtr = require("../controllers/auth-controller");

// REGISTER USER
router.post("/auth/register", authCtr.REGISTER);

//LOGIN USER
router.post("/auth/login", authCtr.LOGIN);

module.exports = router;

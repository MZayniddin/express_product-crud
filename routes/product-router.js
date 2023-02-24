const { Router } = require("express");

// INIT ROUTER
const router = Router();

// IMPORT CONTROLLER
const ProductCtr = require("../controllers/product-controller");

// GET ALL PRODUCT LIST
router.get("/product/list", ProductCtr.GET);

// GET ONE PRODUCT
router.get("/product/retrieve/:id", ProductCtr.GET_ONE);

// CREATE NEW PRODUCT
router.post("/product/create", ProductCtr.CREATE);

// UPDATE PRODUCT
router.put("/product/update/:id", ProductCtr.UPDATE);

// DELETE PRODUCT
router.delete("/product/destroy/:id", ProductCtr.DELETE);

module.exports = router;

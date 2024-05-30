const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();
const {
  createFoodController,
  getAllFoodController,
  updateFoodController,
  deleteFoodController,
  placeOrderController ,
  orderStatusController
} = require("../controllers/foodController");

router.post("/create", authMiddleware, createFoodController);
router.get("/get", authMiddleware, getAllFoodController);
router.put("/update", authMiddleware, updateFoodController);
router.delete("/delete", authMiddleware, deleteFoodController);
router.post("/placeorder",authMiddleware,placeOrderController )
router.post("/orderstatus",authMiddleware,adminMiddleware,orderStatusController)

module.exports = router;

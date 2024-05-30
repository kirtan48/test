const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/create", authMiddleware, createRestaurantController);
router.get("/getAll", authMiddleware, getAllRestaurantController);
router.get("/get", authMiddleware, getRestaurantController);
router.get("/delete", authMiddleware, deleteRestaurantController);

module.exports = router;

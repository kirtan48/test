const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController
} = require("../controllers/categoryController");

router.post("/create", authMiddleware, createCatController);
router.get("/get", authMiddleware, getAllCatController);
router.put("/update", authMiddleware, updateCatController);
router.delete("/delete", authMiddleware, deleteCatController);

module.exports = router;

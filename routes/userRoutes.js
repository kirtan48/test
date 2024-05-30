const express = require("express");

const {
  getUserController,
  updateUserController,
  updatePassword,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController);
router.put("/updateUserPassword", authMiddleware, updatePassword);
router.delete("/deleteUser", authMiddleware, deleteProfileController);

module.exports = router;

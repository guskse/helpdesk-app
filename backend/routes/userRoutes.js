const express = require("express");
const router = express.Router();

//protect middleware (only user with token can access the route)
const protect = require("../middleware/authMiddleware");

//import controller functions
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

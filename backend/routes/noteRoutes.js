const express = require("express");

// mergeParams so that can get ticket routes redirect
const router = express.Router({ mergeParams: true });

//controller functions
const { getNotes, addNote } = require("../controllers/noteController");

//auth middleware
const protect = require("../middleware/authMiddleware");

//routes
router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;

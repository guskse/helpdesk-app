const express = require("express");
const router = express.Router();

//notes router
const noteRouter = require("./noteRoutes");
//redirect to note router
router.use("/:ticketId/notes", noteRouter)



//controller functions
const {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

//auth middleware
const protect = require("../middleware/authMiddleware");

//routes
router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;

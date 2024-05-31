//async handler middleware
const asyncHandler = require("express-async-handler");

//Models
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

//@ DESC - GET TICKET NOTES
//@ METHOD: GET
//@ PATH: /api/tickets/:ticketId/notes
const getNotes = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the tickets for the user that is logged in (req.user)
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  //send tickets in the response
  res.status(200).json(notes);
});

//@ DESC - CREATE TICKET NOTE
//@ METHOD: POST
//@ PATH: /api/tickets/:ticketId/notes
const addNote = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the tickets for the user that is logged in (req.user)
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //create the note
  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
  });

  //send tickets in the response
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};

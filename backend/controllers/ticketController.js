//async handler middleware
const asyncHandler = require("express-async-handler");

//Models
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@ DESC - GET USER TICKETS
//@ METHOD: GET
//@ PATH: /api/tickets
const getTickets = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the tickets for the user that is logged in (req.user)
  const tickets = await Ticket.find({ user: req.user.id });

  //send tickets in the response
  res.status(200).json(tickets);
});

//@ DESC - GET SINGLE TICKET
//@ METHOD: GET
//@ PATH: /api/tickets/:id
const getSingleTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the ticket by id (in the url parameter :id)
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("No ticket found");
  }

  //if ticket is not from the user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  //send tickets in the response
  res.status(200).json(ticket);
});

//@ DESC - CREATE TICKET
//@ METHOD: POST
//@ PATH: /api/tickets
const createTicket = asyncHandler(async (req, res) => {
  //get the info from req.body to create ticket
  const { product, description } = req.body;

  //if there is no product or description in the req.body
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User must be logged in to create ticket");
  }

  //create ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  //send ticket and status 201 (created)
  res.status(201).json({ ticket });
});

//@ DESC - UPDATE TICKET
//@ METHOD: PUT
//@ PATH: /api/tickets/:id
const updateTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the ticket by id (in the url parameter :id)
  const ticket = await Ticket.findById(req.params.id);

  //if there is no ticket with the id provided
  if (!ticket) {
    res.status(404);
    throw new Error("No ticket found");
  }

  //if ticket is not from the user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  //get the ticket by id with the req.params and update ticket with the req.body info
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body);

  //send response with updated ticket
  res.status(200).json(updatedTicket);
});


//@ DESC - DELETE TICKET
//@ METHOD: DELETE
//@ PATH: /api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the id in the JWT token (req.user)
  const user = await User.findById(req.user.id);

  //if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //find the ticket by id (in the url parameter :id)
  const ticket = await Ticket.findById(req.params.id);

  //if there is no ticket with the id provided
  if (!ticket) {
    res.status(404);
    throw new Error("No ticket found");
  }

  //if ticket is not from the user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  //remove ticket from the mongoDB database
  await Ticket.findByIdAndDelete(req.params.id);

  //send response
  res.status(200).json({ message: "Ticket deleted" });
});

module.exports = {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};

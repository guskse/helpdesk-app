const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      //relate this field to the user objectId
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //relate to the User Schema
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      //the values that can be selected for product:
      enum: [
        "Windows",
        "Mac",
        "MacbookPro",
        "Web",
        "Internet",
        "PC",
        "Notebook",
      ],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      // all the status that ticket can be in
      enum: ["new", "open", "closed"],
      // when generate ticket, the default status is new
      default: "new",
    },
  },

  //automatically add timestamp field (mongoDB)
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);

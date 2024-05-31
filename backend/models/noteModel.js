const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      //relate this field to the user objectId
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //relate to the User Schema
      ref: "User",
    },
    ticket: {
      //relate this field to the user objectId
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //relate to the Ticket Schema
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },

  //automatically add timestamp field (mongoDB)
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);

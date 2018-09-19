const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LastTimeLoginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = LastTimeLogin = mongoose.model("times", LastTimeLoginSchema);

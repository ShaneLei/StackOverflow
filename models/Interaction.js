const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InteractionSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  interaction: [
    {
      date: Date,
      interactionType: String
    }
  ]
});

module.exports = Interaction = mongoose.model(
  "interactions",
  InteractionSchema
);

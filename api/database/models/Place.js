const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
    unique: true
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Place = mongoose.model("place", PlaceSchema);

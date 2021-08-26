const mongoose = require("../database/index");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  trailler: {
    type: String,
    required: true,
  },
  imageURL: {
      type: String,
      required: true,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
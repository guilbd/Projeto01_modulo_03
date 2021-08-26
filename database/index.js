const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db_games", {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
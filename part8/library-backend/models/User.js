const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: 3,
    unique: true,
  },
  favoriteGenre: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);

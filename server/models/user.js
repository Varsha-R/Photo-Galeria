const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  photos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Photo" }],
});

userSchema.plugin(uniqueValidator); // To make sure the same email isn't created again

module.exports = mongoose.model("User", userSchema);

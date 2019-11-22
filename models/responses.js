const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ResponseSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: "User" },
  advertisement: { type: ObjectId, ref: "Advertisement" },
  price: Number,
  authorName: String
});

module.exports = mongoose.model("Response", ResponseSchema);

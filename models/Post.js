const mongoose = require("mongoose");
const Category = require("./Category");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  post_image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  author: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  date: { type: Date, default: Date.now },
  post_image: { type: String, require: true },
});

module.exports = mongoose.model("Post", PostSchema);

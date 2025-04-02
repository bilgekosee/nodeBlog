const mongoose = require("mongoose");
const Post = require("./models/Post");

mongoose
  .connect("mongodb://127.0.0.1:27017/nodeblog_test_db")
  .then(async () => {
    console.log("Connected!");

    try {
      const post = await Post.create({
        title: " second post title",
        content: "second post content",
      });
      console.log("Created Post:", post);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });

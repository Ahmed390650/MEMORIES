import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const postModule = mongoose.model("PostMessage", postsSchema);

export default postModule;

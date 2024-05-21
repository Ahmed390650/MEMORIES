import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const postModule = mongoose.model("PostMessage", postsSchema);

export default postModule;

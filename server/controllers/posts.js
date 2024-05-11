import mongoose from "mongoose";
import postModule from "../modules/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await postModule.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;

  const newPost = new postModule(post);
  try {
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("unvalid object id");
  const updatePost = await postModule.findByIdAndUpdate({ _id }, post, {
    new: true,
  });
  res.status(201).json(updatePost);
};
export const likePost = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("unvalid object id");

  const post = await postModule.findById(_id);
  const updatePost = await postModule.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    {
      new: true,
    }
  );
  res.status(201).json(updatePost);
};
export const deletePost = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("unvalid object id");
  await postModule.findByIdAndDelete({ _id });
  res.json({ message: "Post delete successfully" });
};

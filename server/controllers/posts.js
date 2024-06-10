import mongoose from "mongoose";
import postModule from "../modules/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8;
    const skip = (Number(page) - 1) * limit;
    const total = await postModule.countDocuments({});
    const posts = await postModule
      .find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModule.findById(id);
    res.status(200).json({
      post,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { SearchQuery, tags } = req.query;
  try {
    const title = new RegExp(SearchQuery, "i");
    const posts = await postModule.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new postModule({
    ...post,
    creator: req.userId,
    createAt: new Date().toISOString(),
  });
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
  if (!req.userId) return res.status(402).json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("unvalid object id");
  const post = await postModule.findById(_id);

  const index = post.likeCount.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likeCount.push(req.userId);
  } else {
    post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
  }
  const updatePost = await postModule.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(201).json(updatePost);
};
export const deletePost = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("unvalid object id");
  await postModule.findByIdAndDelete({ _id });
  res.json({ message: "Post delete successfully" });
};

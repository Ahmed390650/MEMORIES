import expres from "express";
import {
  createPosts,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";

const route = expres.Router();

route.get("/", getPosts);
route.post("/", createPosts);
route.patch("/:_id", updatePost);
route.delete("/:_id", deletePost);
route.patch("/:_id/likePost", likePost);

export default route;

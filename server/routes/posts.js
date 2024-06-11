import expres from "express";
import {
  createPosts,
  deletePost,
  getPost,
  getPosts,
  getPostsBySearch,
  likePost,
  updatePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const route = expres.Router();

route.get("/search", getPostsBySearch);
route.get("/", getPosts);
route.post("/", auth, createPosts);
route.patch("/:_id", auth, updatePost).get("/:id", getPost);
route.delete("/:_id", auth, deletePost);
route.patch("/:_id/likePost", auth, likePost);
route.post("/:id/commentPost", commentPost);
export default route;

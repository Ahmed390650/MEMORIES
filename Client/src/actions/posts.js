import * as api from "../api/index";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  Start_LOADING,
  END_LOADING,
  UPDATE,
  FETCH_POST,
} from "../constants/actionType";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: Start_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: Start_LOADING });
    const {
      data: { post },
    } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: post });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: Start_LOADING });

    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPostsBySearch(search);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const LikePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

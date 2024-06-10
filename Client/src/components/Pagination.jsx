import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";
const Paginate = (params) => {
  const { page } = params;
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      variant="outlined"
      color="primary"
      page={Number(page) || 1}
      count={numberOfPages}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`?page=${item.page}`}></PaginationItem>
      )}></Pagination>
  );
};

export default Paginate;

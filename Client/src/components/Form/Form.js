import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../actions/posts";

const initPostData = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initPostData);
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData(initPostData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === null) {
      dispatch(createPosts({ ...postData, name: user.result.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user.result.name }));
      clear();
    }
  };
  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create posts !!!
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "UPDATEING" : "CREATE"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ marginBottom: "10px" }}
          fullWidth>
          Submit
        </Button>
        <Button
          onClick={clear}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

import expres from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { posts, userRouter } from "./routes/index.js";
const app = expres();

const mongodbURL = "mongodb://127.0.0.1:27017/MEMORIES  ";
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use("/posts", posts);
app.use("/user", userRouter);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

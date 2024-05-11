import expres from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoute from "./routes/posts.js";
const app = expres();

const mongodbURL =
  "mongodb+srv://ahmedElsayed:ahmedElsayed123@cluster0.knt1bki.mongodb.net/";

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use("/posts", postRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

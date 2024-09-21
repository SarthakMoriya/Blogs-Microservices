import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => {
    console.error("Error connecting to DB");
  });

app.listen(3007, () => {
  console.log("Comment CR listening on port 3007");
});

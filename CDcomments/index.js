import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/blogs',router)

mongoose
  .connect(
    `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => {
    console.log(err);
    console.error("Error connecting to DB");
  });

app.listen(3007, () => {
  console.log("Comment CR listening on port 3007");
});

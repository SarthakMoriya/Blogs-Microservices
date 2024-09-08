import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";

const app = express();

mongoose.connect(
  `mongodb+srv://sarthak:AP945cfylvOTjkTz@cluster0.3ner1bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
app.use(express.json());
app.use(cors());
app.use("/delete", router);

app.listen(3002, () => {
  console.log("Delete server listening on port 3002");
});

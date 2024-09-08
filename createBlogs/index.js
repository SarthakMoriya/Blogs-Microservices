import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://sarthak:AP945cfylvOTjkTz@cluster0.3ner1bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

app.use('/create',router)

app.listen(3001, () => {
  console.log("Create server listening on port 3001");
});

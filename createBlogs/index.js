import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes.js";
import nats from "nats";

let pool;
export const connectToNats = async () => {
  if (!pool) {
    pool = await nats.connect({ servers: ["nats://nats:4222"] });
  }
  return pool;
};
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

app.use("/create", router);

app.listen(3001, () => {
  connectToNats();
  console.log("Create server listening on port 3001");
});

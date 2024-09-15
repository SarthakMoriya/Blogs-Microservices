import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import nats from "nats";

const app = express();
let pool;

export const initializeNATS = async () => {
  try {
    if (!pool) pool = await nats.connect(["nats://0.0.0.0:4222"]);
    console.log(`NATS Connected at ${pool.getServer()}`);
    return pool;
  } catch (error) {
    console.log("Error connecting to NATS!");
    pool=null;
  }
};


mongoose.connect(
  `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
app.use(express.json());
app.use(cors());
app.use("/delete", router);

app.listen(3002, () => {
  initializeNATS();
  console.log("Delete server listening on port 3002");
});

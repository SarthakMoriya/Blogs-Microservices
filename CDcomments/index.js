import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import { getKafkaInstance } from "./kafka.js";
import { createClient } from "redis";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/blogs", router);

mongoose
  .connect(
    `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => {
    console.log(err);
    console.error("Error connecting to DB");
  });

app.listen(3007, () => {
  getKafkaInstance();
  connectRedis();
  console.log("Comment CR listening on port 3007");
});

let client = null;
export const connectRedis = async () => {
  if (client == null) {
    // let client = await createClient({ url: "redis://redis:6379" })
    client = await createClient({ url: "redis://localhost:6379" })
      .on("error", (err) => {
        console.log("Redis Client Error", err);
      })
      .connect();
  }
  console.log("Redis Connected!");
  return client;
};

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import { getKafkaInstance } from "./kafka.js";
import { createClient } from "redis";
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/blogs", router);

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${process.env.MONGO_URL}`).catch((err) => {
      reject(err);
    });
    resolve("DB CONNECTED");
  });
};

app.listen(3007, () => {
  connectDB()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
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

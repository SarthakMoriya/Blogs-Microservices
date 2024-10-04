import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/route.js";
import { createClient } from "redis";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.MONGO_URL);
app.use("/auth", router);

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${process.env.MONGO_URL}`).catch((err) => {
      reject(err);
    });
    resolve("DB CONNECTED");
  });
};

app.listen(3005, () => {
  connectDB()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  connectRedis();
  console.log("AUth service listening on port 3005");
});

let client = null;
export const connectRedis = async () => {
  if (client == null) {
    // let client = await createClient({ url: "redis://redis:6379" })
    client = await createClient({ url: "redis://localhost:6379" })
      .on("error", (err) => {
        console.log("Redis Client Error", err);
        // setTimeout(() => {
        //   connectRedis();
        // },10000);
      })
      .connect();
    console.log("Redis Connected!");
  }
  return client;
};

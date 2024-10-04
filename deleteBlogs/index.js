import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import nats from "nats";
import { getKafkaInstance } from "./kafka.js";
import "dotenv/config";

const app = express();
let pool;

export const initializeNATS = async () => {
  try {
    if (!pool) pool = await nats.connect({ servers: ["nats://nats:4222"] });
    console.log(`NATS Connected at ${pool.getServer()}`);
    return pool;
  } catch (error) {
    console.log("Error connecting to NATS!");
    pool = null;
  }
};

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${process.env.MONGO_URL}`).catch((err) => {
      reject(err);
    });
    resolve("DB CONNECTED");
  });
};
app.use(express.json());
app.use(cors());
app.use("/delete", router);

app.listen(3002, () => {
  // initializeNATS();
  connectDB()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  getKafkaInstance();
  console.log("Delete server listening on port 3002");
});

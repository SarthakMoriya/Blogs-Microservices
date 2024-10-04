import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import nats from "nats";
import { getKafkaInstance } from "./kafka.js";
import "dotenv/config";

let pool;
let NATS = nats;
export const connectToNats = async () => {
  if (!pool) {
    pool = await NATS.connect({ servers: ["nats://nats:4222"] });
  }
  return pool;
};
const app = express();
app.use(express.json());
app.use(cors());
app.use("/update", router);

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${process.env.MONGO_URL}`).catch((err) => {
      reject(err);
    });
    resolve("DB CONNECTED");
  });
};

app.listen(3004, () => {
  // connectToNats();
  connectDB()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  getKafkaInstance();
  console.log("Update server listening on port 3004");
});

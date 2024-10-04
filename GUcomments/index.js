import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import nats from "nats";
import { getKafkaInstance } from "./kafka.js";
import {createClient} from 'redis'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/blogs", router);

let pool;
export const connectToNats = async () => {
  if (!pool) {
    pool = await nats
      .connect({ servers: ["nats://0.0.0.0:4222"] }).then(()=>{
        console.log(`Nats connection established `)
      })
      .catch((err) => {
        setTimeout(() => {
          connectToNats();
        }, 5000);
      });
  }
  return pool;
};

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${process.env.MONGO_URL}`).catch((err) => {
      reject(err);
    });
    resolve("DB CONNECTED");
  });
};

app.listen(3008, () => {
  // connectToNats();
  // connectRedis();
  // getKafkaInstance();
  connectDB()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  console.log("Comment GU listening on port 3008");
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
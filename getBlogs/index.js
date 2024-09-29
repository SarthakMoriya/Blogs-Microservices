import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes.js";
import nats from "nats";
import { createClient } from "redis";
import { getKafkaInstance } from "./kafka.js";
import { handleKafkaMessages } from "./controller/getBlogs.js";

let pool;
export const initializeNATS = async () => {
  try {
    if (!pool) pool = await nats.connect({ servers: ["nats://nats:4222"] });
    // if (!pool) pool = await nats.connect(["nats://0.0.0.0:4222"]);
    console.log(`NATS Connected at ${pool.getServer()}`);
    return pool;
  } catch (error) {
    console.log("Error connecting to NATS!");
    pool = null;
  }
};
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

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => {
    console.error("Error connecting to DB");
  });

app.use("/get", router);

app.listen(3003, () => {
  // initializeNATS();
  // handleNats();
  getKafkaInstance();
  handleKafkaMessages();
  console.log("Get server listening on port 3003");
});

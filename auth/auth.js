import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/route.js'
import { createClient } from "redis";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth',router)

mongoose.connect(
  `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
// p9wEwyQQbCAiNZPA
app.listen(3005, () => {
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
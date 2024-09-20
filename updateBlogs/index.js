import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from './routes/route.js'
import nats from "nats";

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
app.use('/update',router)

mongoose.connect(
  `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);



app.listen(3004, () => {
  connectToNats()
  console.log("Update server listening on port 3004");
});

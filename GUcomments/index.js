import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import nats from "nats";

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

mongoose
  .connect(
    `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => {
    console.log(err);
    console.error("Error connecting to DB");
  });

app.listen(3008, () => {
  connectToNats();
  console.log("Comment GU listening on port 3008");
});

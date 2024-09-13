import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/route.js'
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth',router)

mongoose.connect(
  `mongodb+srv://sarthak:p9wEwyQQbCAiNZPA@cluster0.dkryym7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
// p9wEwyQQbCAiNZPA
app.listen(3005, () => {
  console.log("AUth service listening on port 3005");
});

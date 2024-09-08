import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from './routes/route.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/update',router)

mongoose.connect(
  `mongodb+srv://sarthak:AP945cfylvOTjkTz@cluster0.3ner1bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);


app.listen(3004, () => {
  console.log("Update server listening on port 3004");
});

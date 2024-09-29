import Blog from "../models/blogModel.js";
import User from "../models/authModel.js";
import { connectRedis, initializeNATS } from "../index.js";
import nats from "nats";
import mongoose, { connect } from "mongoose";
import { createConsumer, getKafkaInstance } from "../kafka.js";

mongoose.model("Users");

export const handleKafkaMessages = async () => {
  try {
    const redis = await connectRedis();
    if (redis == null) throw new Error("Error connecting to REDIS");

    const consumer = await createConsumer("message-bus", [
      "create",
      "update",
      "delete",
    ]);
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("TOPIC" + topic);
        if (topic == "create") {
          const { _id, ...others } = JSON.parse(message.value.toString());
          await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
        }
        if (topic == "update") {
          const { _id, ...others } = JSON.parse(message.value.toString());
          await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
        }
        if (topic == "delete") {
          console.log("INSIDE DELETE",message.value.toString());
          const data =JSON.parse(message.value.toString());
          console.log(data)
          await redis.hDel("blogs", data.data);
        }
      },
    });
  } catch (error) {
    console.log("-------------------------")
    console.log(error);
    console.log("-------------------------")
  }
};

// export const handleNats = async () => {
//   try {
//     const redis = await connectRedis();
//     const nc = await initializeNATS();
//     const sc = nats.StringCodec();
//     if (redis == null) throw new Error("Error connecting to REDIS");
//     if (nc == null) throw new Error("Error connecting to NATS");

//     // SUBSCRIBE TO ALL TOPICS
//     const topic_d = nc.subscribe("delete");
//     const topic_c = nc.subscribe("create");
//     const topic_u = nc.subscribe("update");

//     //HANDLE EACH TOPIC
//     const handleTopicD = async () => {
//       try {
//         for await (const msg1 of topic_d) {
//           console.log("Received message from delete:", sc.decode(msg1.data));
//           const data = JSON.parse(sc.decode(msg1.data));

//           await redis.hDel("blogs", data.data);
//         }
//       } catch (error) {
//         console.log("Error deleting cache");
//       }
//     };
//     const handleTopicC = async () => {
//       try {
//         for await (const msg of topic_c) {
//           const data = JSON.parse(sc.decode(msg.data));
//           let { _id, ...others } = data.data;
//           console.log(_id, others);
//           await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
//         }
//       } catch (error) {
//         console.log(error);
//         console.log("Error setting cache...");
//       }
//     };
//     const handleTopicU = async () => {
//       try {
//         for await (const msg of topic_u) {
//           const { data } = JSON.parse(sc.decode(msg.data));
//           const { _id, ...others } = data;
//           await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
//         }
//       } catch (error) {
//         console.log("Error setting cache...");
//       }
//     };

//     // Run all handlers concurrently
//     await Promise.all([handleTopicD(), handleTopicC(), handleTopicU()]);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const blogs = await Blog.find()
      .populate("author")
      .limit(limit)
      .skip(page > 1 ? limit * (page - 1) : 0)
      .sort({ createdAt: 1 });
    // blogs.forEach(async blog =>)
    // handleNats();
    // handleRedis();
    res.status(200).json({
      message: "fetched blogs",
      status: "success",
      body: { blogs },
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Error fetching blogs",
      status: "fail",
      body: { blogs: [] },
      error: { ...error?.errorResponse },
    });
  }
};


const handleRedis=async()=>{
  console.log("HERE")
  try {
    const client=await connectRedis();
    const blogs=await client.hGetAll('blogs')
  } catch (error) {
    console.log(error)
  }
}
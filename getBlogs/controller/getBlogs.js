import { connectRedis, initializeNATS } from "../index.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

export const handleNats = async () => {
  try {
    const redis = await connectRedis();
    const nc = await initializeNATS();
    const sc = nats.StringCodec();
    if (redis == null) throw new Error("Error connecting to REDIS");
    if (nc == null) throw new Error("Error connecting to NATS");
    await nc.subscribe("delete", (msg1) => {
      const data1 = sc.decode(msg1.data);
      console.log("Received message from topic D:", data1);
      // Handle topic D message
    });

    await nc.subscribe("create", (msg2) => {
      const data2 = sc.decode(msg2.data);
      console.log("Received message from topic C:", data2);
      // Handle topic C message
    });
    // SUBSCRIBE TO ALL TOPICS
    const topic_d = nc.subscribe("delete");
    const topic_c = nc.subscribe("create");
    const topic_u = nc.subscribe("update");

    //HANDLE EACH TOPIC
    const handleTopicD = async () => {
      try {
        for await (const msg1 of topic_d) {
          console.log("Received message from delete:", sc.decode(msg1.data));
          const data = JSON.parse(sc.decode(msg1.data));

          await redis.hDel("blogs", data.data);
        }
      } catch (error) {
        console.log("Error deleting cache");
      }
    };
    const handleTopicC = async () => {
      try {
        for await (const msg of topic_c) {
          const data = JSON.parse(sc.decode(msg.data));
          let { _id, ...others } = data.data;
          await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
        }
      } catch (error) {
        console.log("Error setting cache...");
      }
    };
    const handleTopicU = async () => {
      try {
        for await (const msg of topic_u) {
          const { data } = JSON.parse(sc.decode(msg.data));
          const { _id, ...others } = data;
          await redis.hSet("blogs", _id, JSON.stringify({ ...others }));
        }
      } catch (error) {
        console.log("Error setting cache...");
      }
    };

    // Run all handlers concurrently
    await Promise.all([handleTopicD(), handleTopicC(), handleTopicU()]);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    handleNats();

    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

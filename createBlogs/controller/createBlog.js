import Blog from "../models/blogModel.js";
import nats from "nats";


export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body });
    await blog.save();

    // Use NATS client
    const nc = await nats.connect({ servers: ["nats://nats:4222"] });
    console.log(`connected to NATS server :--${nc.getServer()}`);
    const sc = nats.StringCodec();
    nc.publish('create', sc.encode(JSON.stringify({ data: blog })));
    nc.closed().then(() => {
      console.log('Connection closed');
    }).catch((err) => {
      console.error('NATS connection error:', err);
    });

    res.send("Blog creeated")
  } catch (error) {
    console.log("Error "+error)
    res.send(error);
  }
};

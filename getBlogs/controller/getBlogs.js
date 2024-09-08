import Blog from "../models/blogModel.js";
import nats from 'nats';

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    const nc = await nats.connect({ servers: ["nats://nats:4222"] });
    console.log(`connected to NATS server :--${nc.getServer()}`);
    const sc = nats.StringCodec();
    nc.closed().then(() => {
      console.log('Connection closed');
    }).catch((err) => {
      console.error('NATS connection error:', err);
    });

    const sub = nc.subscribe("create");
    (async () => {
      for await (const msg of sub) {
        console.log('Received message:', sc.decode(msg.data));
      }
    })();
    res.send(blogs);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};

import { initializeNATS } from "../index.js";
import { createProducer } from "../kafka.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

const handleNATS = async (id) => {
  try {
    const nc = await initializeNATS();
    const sc = nats.StringCodec();
    await nc.publish("delete", sc.encode(JSON.stringify({ data: id })));
    console.log("DELETE PUBLISHED");
  } catch (error) {
    console.log("ERROR PUBLOSHIUNG");
  }
};

const handleKafka = async (id) => {
  const producer = await createProducer();
  try {
    await producer.send({
      topic: "delete",
      messages: [{ key: "key3", value: JSON.stringify({ data: id }) }],
    });
    console.log("DELETE topic published");
  } catch (error) {
    console.log(error);
    console.log("Error creating topic -- DELETE");
  } finally {
    await producer.disconnect();
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      handleKafka(req.params.id);
      // handleNATS(req.params.id);
      //   const nc =  await initializeNATS();
      // const sc = nats.StringCodec();
      // await nc.publish('delete', sc.encode(JSON.stringify({ data: req.params.id })));
      return res.status(200).json({
        status: "success",
        message: "Blog deleted successfully",
        body: {},
      });
    } else {
      return res.status(200).json({
        status: "fail",
        message: "Blog not found with id",
        body: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "fail",
      message: "Error deleting blog",
      body: {},
    });
  }
};

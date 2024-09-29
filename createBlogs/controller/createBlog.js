import { createProducer } from "../kafka.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

const handleNats = async (blog) => {
  const nc = await initializeNATS();
  const sc = nats.StringCodec();
  await nc.publish("create", sc.encode(JSON.stringify({ data: blog })));
};

const handleKafka = async (blog) => {
  const producer =await createProducer();
  try {
    await producer.send({
      topic:"create",
      messages: [{key:"key1",value:JSON.stringify(blog)}]
    })
    console.log("CREATE topic published")
  } catch (error) {
    console.log(error)
    console.log("Error creating topic -- CREATE")
  }finally{
    await producer.disconnect();
  }
}


export const createBlog = async (req, res) => {
  try {
    let blog = new Blog({ ...req.body });
    await blog.save();
    // handleNats(blog);
    handleKafka(blog);
    res
      .status(200)
      .json({
        message: "blog created",
        status: "success",
        body: {},
        error: {},
      });
  } catch (error) {
    console.log("Error " + error);
    res
      .status(200)
      .json({
        message: "Error creating blog",
        status: "fail",
        body: {},
        error: { ...error?.errorResponse },
      });
  }
};

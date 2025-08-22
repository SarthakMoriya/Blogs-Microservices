import { Kafka } from "kafkajs";
import config from "./config.js";

let kafkaInstance = null;

console.log("KAFKA URL IS")
console.log(config)

export const getKafkaInstance = () => {
  if (!kafkaInstance) {
    kafkaInstance = new Kafka({
      clientId: "my-app",
      brokers: [config.KAFKA_URL], 
      // brokers: ["kafka:29092"],
    });
  }
  return kafkaInstance;
};
export const createProducer = async () => {
  const kafka = getKafkaInstance();
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId, topics) => {
  const kafka = getKafkaInstance();
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await Promise.all(
    topics.map((topic) => consumer.subscribe({ topic, fromBeginning: true }))
  );
  return consumer;
};

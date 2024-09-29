import { Kafka } from "kafkajs";

let kafkaInstance = null;

export const getKafkaInstance = () => {
  if (!kafkaInstance) {
    kafkaInstance = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"], 
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

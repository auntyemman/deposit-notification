import amqp from "amqplib";
import { APIError } from "../utils/helper/customError";
export const connectRabbitMQ = async () => {
  try {
    const url = process.env.RABBITMQ_URL;
    if (!url) {
      throw new APIError("Missing RABBITMQ_URL environment variable");
    }
    const connection = await amqp.connect(url);
    console.log("Connected to RabbitMQ");
    return connection;
  } catch (error) {
    throw new APIError("Failed to connect to RabbitMQ");
  }
};

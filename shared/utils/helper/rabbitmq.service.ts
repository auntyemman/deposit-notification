import { connectRabbitMQ } from "../../config/rabbitmq";
import amqp from "amqplib";

export const sendMessage = async (queue: string, message: any) => {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
  setTimeout(() => {
    connection.close();
  }, 50000);
};

export const receiveMessage = async (
  queue: string,
  callback: (msg: amqp.Message) => void,
) => {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      await callback(msg);
      channel.ack(msg);
    }
  });
};

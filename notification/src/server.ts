import { App } from "./app";
import { mongoDBConnection } from "../../shared/config/mongoDB";
//import { DepositCronJob } from "./cron-jobs/deposit.cron";
import { RabbitDepositCronJob } from "./cron-jobs/rabbitmq-deposit.cron";

class Server {
  private readonly app: App;

  constructor() {
    this.app = new App();
  }

  async start() {
    try {
      this.app.start();
      await mongoDBConnection();
      console.log("Server started successfully.");
    } catch (error) {
      console.error("Failed to start server:");
      process.exit(1);
    }
  }
}
// const depositCronJob = new DepositCronJob();
// depositCronJob.start();

const depositCronJob = new RabbitDepositCronJob();
depositCronJob.start();

const server = new Server();
server.start();

import { App } from "./app";
import { mongoDBConnection } from "../../shared/config/mongoDB";
import { UserService } from "./services/user.service";

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
const userService = new UserService();
userService.startListening();

const server = new Server();
server.start();

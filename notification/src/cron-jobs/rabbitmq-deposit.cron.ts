import cron from "node-cron";
import {
  sendMessage,
  receiveMessage,
} from "../../../shared/utils/helper/rabbitmq.service";
import { APIError } from "../../../shared/utils/helper/customError";
import { NotificationService } from "../services/notification.service";
import { IUser } from "../../../shared/interfaces/user.interface";

export class RabbitDepositCronJob {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  start() {
    cron.schedule("* * * * *", async () => {
      console.log("Running the deposit check cron job...");
      try {
        // Request all users
        sendMessage("getAllUsers", {});
        let users: IUser[] = [];

        // Receive all users
        await receiveMessage("getAllUsersResponse", async (msg) => {
          users = await JSON.parse(msg.content.toString());
        });

        const amount = 100; // Example amount to check for automated deposit

        for (const user of users) {
          try {
            // Request if user has sufficient funds
            sendMessage("hasSufficientFunds", { userId: user.id, amount });

            let hasSufficientFunds: boolean = false;

            // Receive response for sufficient funds
            await receiveMessage("hasSufficientFundsResponse", async (msg) => {
              const response = await JSON.parse(msg.content.toString());
              console.log("response for wallet", response);
              if (response.userId === user.id) {
                hasSufficientFunds = response.hasFunds;
              }
            });

            if (!hasSufficientFunds) {
                console.log("has balance", user);
              await this.notificationService.sendNotification(user, amount);
            }
          } catch (error) {
            throw new APIError(`Error processing user ${user.id}`);
          }
        }
      } catch (error) {
        throw new APIError("Error fetching users");
      }
    });
  }
}

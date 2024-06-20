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

        // Receive all users
        const users: IUser[] = await new Promise((resolve, reject) => {
            let users: IUser[] = [];
            receiveMessage("getAllUsersResponse", async (msg) => {
              users = await JSON.parse(msg.content.toString());
              resolve(users);
            }).catch((err) => reject(err));
          });

        const amount = 100; // Example amount to check for automated deposit
        for (const user of users) {
          try {
            // Request if user has sufficient funds
            sendMessage("hasSufficientFunds", { userId: user.id, amount });

            // Receive response for sufficient funds
            const hasSufficientFunds: boolean = await new Promise((resolve, reject) => {
                receiveMessage("hasSufficientFundsResponse", async (msg) => {
                  const response = await JSON.parse(msg.content.toString());
                  if (response.userId === user.id) {
                    resolve(response.hasFunds);
                  } else {
                    resolve(false);
                  }
                }).catch((err) => reject(err));
              });

            if (!hasSufficientFunds) {
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

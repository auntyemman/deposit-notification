import cron from "node-cron";
import { UserService } from "../../../user-management/src/services/user.service";
import { WalletService } from "../../../user-wallet/src/services/wallet.service";
import { NotificationService } from "../services/notification.service";
import { APIError } from "../../../shared/utils/helper/customError";
//import { User } from "../../../user-management/src/entities/user.entity";
import { IUser } from "../../../shared/interfaces/user.interface";
export class DepositCronJob {
  private userService: UserService;
  private walletService: WalletService;
  private notificationService: NotificationService;

  constructor() {
    this.userService = new UserService();
    this.walletService = new WalletService();
    this.notificationService = new NotificationService();
  }

  start() {
    cron.schedule("0 * * * *", async () => {
      console.log("Running the deposit check cron job...");

      let users: IUser[];
      try {
        users = await this.userService.getAllUsers();
      } catch (error) {
        throw new APIError("Error fetching users");
      }

      const amount = 100; // Example amount to check for automated deposit

      for (const user of users) {
        try {
          const hasSufficientFunds =
            await this.walletService.hasSufficientFunds(user.id, amount);
          console.log("has balance", hasSufficientFunds);
          if (!hasSufficientFunds) {
            await this.notificationService.sendNotification(user, amount);
          }
        } catch (error) {
          throw new APIError(`Error processing user ${user.id}:`);
        }
      }
    });
  }
}

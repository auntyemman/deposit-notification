import { UserService } from "../../../user-management/src/services/user.service";
import { NotFoundError } from "../../../shared/utils/helper/customError";
import {
  receiveMessage,
  sendMessage,
} from "../../../shared/utils/helper/rabbitmq.service";
export class WalletService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async hasSufficientFunds(userId: string, amount: number): Promise<boolean> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user.walletBalance >= amount;
  }

  startListening() {
    receiveMessage("hasSufficientFunds", async (msg) => {
      const { userId, amount } = JSON.parse(msg.content.toString());
      const hasFunds = await this.hasSufficientFunds(userId, amount);
      sendMessage("hasSufficientFundsResponse", { userId, hasFunds });
    });
  }
}

import { client } from "../../../shared/config/twilio";
import { APIError } from "../../../shared/utils/helper/customError";
import { TopUpLink } from "../../../shared/utils/helper/constants";

export class MobileNotificationService {
  async sendMobileNotification(
    to: string,
    userName: string,
    amount: number,
  ): Promise<void> {
    try {
      await client.messages.create({
        body: `Hi ${userName}, Automated deposit of ${amount} failed due to insufficient funds. Top up your wallet: ${TopUpLink}`,
        from: process.env.TWILIO_NUMBER,
        to,
      });
    } catch (error) {
      throw new APIError("Error sending mobile notification:");
    }
  }
}

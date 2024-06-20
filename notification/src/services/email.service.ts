import { transporter } from "../../../shared/config/nodeMailer";
import { insufficientFundsEmail } from "../common/email-template/insufficient-funds";
import { TopUpLink } from "../../../shared/utils/helper/constants";
import { APIError } from "../../../shared/utils/helper/customError";

export class EmailService {
  async sendEmail(to: string, userName: string, amount: number): Promise<void> {
    try {
      const mailOptions = {
        from: "Stackivy <no-reply@stackivy.com>",
        to,
        subject: "Automated Deposit Failed - Stackivy",
        html: insufficientFundsEmail(userName, amount, TopUpLink),
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new APIError("Error sending email notification:");
    }
  }
}

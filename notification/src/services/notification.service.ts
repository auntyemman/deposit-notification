import { EmailService } from "./email.service";
import { MobileNotificationService } from "./mobile-notification.service";
// import { User } from "../../../user-management/src/entities/user.entity";
import { IUser } from "../../../shared/interfaces/user.interface";
import { BadRequestError } from "../../../shared/utils/helper/customError";
export class NotificationService {
  private emailService: EmailService;
  private mobileNotificationService: MobileNotificationService;

  constructor() {
    this.emailService = new EmailService();
    this.mobileNotificationService = new MobileNotificationService();
  }

  async sendNotification(user: IUser, amount: number): Promise<void> {
    if (user.notificationType === "email") {
      await this.emailService.sendEmail(user.email, user.username, amount);
    } else if (user.notificationType === "mobile") {
      await this.mobileNotificationService.sendMobileNotification(
        user.mobileNumber,
        user.username,
        amount,
      );
    } else {
      throw new BadRequestError("Invalid notification type");
    }
  }
}

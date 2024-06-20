import { Twilio } from "twilio";
import { APIError } from "../utils/helper/customError";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

if (!accountSid || !authToken) {
  throw new APIError("Missing required Twilio environment variables");
}

export const client = new Twilio(accountSid, authToken);

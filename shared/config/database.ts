import { DataSource } from "typeorm";
import { config } from "dotenv";
import { DatabaseConnectionError } from "../utils/helper/customError";
import { User } from "../entities/user.entity";

config();

export const connectDatabase = async () => {
  try {
    await new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: ["src/migrations/**/*.ts"],
      subscribers: ["src/subscribers/**/*.ts"],
    });
    console.log("Database connection established.");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

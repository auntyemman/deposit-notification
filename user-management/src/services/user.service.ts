import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import {
  receiveMessage,
  sendMessage,
} from "../../../shared/utils/helper/rabbitmq.service";
import { IUser } from "../../../shared/interfaces/user.interface";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(userId: string): User | undefined {
    return this.userRepository.findById(userId);
  }

  getAllUsers(): User[] {
    return this.userRepository.getAll();
  }

  startListening() {
    receiveMessage("getAllUsers", async () => {
      const users = await this.getAllUsers();
      sendMessage("getAllUsersResponse", users);
    });

    receiveMessage("getUserById", async (msg) => {
      const { userId } = JSON.parse(msg.content.toString());
      const user = await this.getUserById(userId);
      sendMessage("getUserByIdResponse", user);
    });
  }
}

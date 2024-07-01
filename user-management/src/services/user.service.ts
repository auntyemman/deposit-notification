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

  public async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  public async createUser(user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }

  public async getUserById(id: string): Promise<any> {
    return this.userRepository.findById(id);
  }

  public async updateUser(
    id: string,
    user: Partial<IUser>,
  ): Promise<IUser | null> {
    return this.userRepository.update(id, user);
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    return this.userRepository.delete(id);
  }
  // private userRepository: UserRepository;

  // constructor() {
  //   this.userRepository = new UserRepository();
  // }

  // getUserById(userId: string): User | undefined {
  //   return this.userRepository.findById(userId);
  // }

  // getAllUsers(): User[] {
  //   return this.userRepository.getAll();
  // }

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

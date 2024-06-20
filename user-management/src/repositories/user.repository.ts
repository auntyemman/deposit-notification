import { User } from "../entities/user.entity";

export class UserRepository {
  private users: User[] = [
    new User("1", "young_john", "john@gmail.com", "08108773399", 50, "email"),
    new User("2", "jane_soft", "jane@yahoo.com", "09038446678", 100, "email"),
    new User("3", "baraka", "baraka@gmail.com", "09038446678", 150, "mobile"),
  ];

  findById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  getAll(): User[] {
    return this.users;
  }
}

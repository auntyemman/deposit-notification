import { User } from "../entities/user.entity";

import { IUser } from "../../../shared/interfaces/user.interface";

export class UserRepository {
  public async findAll(): Promise<any> {
    return User.find().exec();
  }

  public async findById(id: string): Promise<any> {
    return User.findById(id).exec();
  }

  public async create(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }

  public async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  public async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec();
  }
}

// export class UserRepository {
//   private users: User[] = [
//     new User("1", "young_john", "john@gmail.com", "08108773399", 50, "email"),
//     new User("2", "jane_soft", "jane@yahoo.com", "09038446678", 100, "email"),
//     new User("3", "baraka", "baraka@gmail.com", "09038446678", 150, "mobile"),
//   ];

//   findById(userId: string): User | undefined {
//     return this.users.find((user) => user.id === userId);
//   }

//   getAll(): User[] {
//     return this.users;
//   }
// }

import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../../../shared/interfaces/user.interface";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      const err = error as Error; // Type assertion
      res.status(500).json({ error: err.message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const err = error as Error; // Type assertion
      res.status(500).json({ error: err.message });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      const err = error as Error; // Type assertion
      res.status(500).json({ error: err.message });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: Partial<IUser> = req.body;
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        user,
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const err = error as Error; // Type assertion
      res.status(500).json({ error: err.message });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const err = error as Error; // Type assertion
      res.status(500).json({ error: err.message });
    }
  };
}

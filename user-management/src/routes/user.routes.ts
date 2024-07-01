import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
export const router = Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// export default router;

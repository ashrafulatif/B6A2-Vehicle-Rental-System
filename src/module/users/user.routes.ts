import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { userController } from "./user.controller";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.get("/", authMiddleware(Roles.admin), userController.getAllUsers);

router.put(
  "/:userId",
  authMiddleware(Roles.admin, Roles.customer),
  userController.updateUser
);

router.delete(
  "/:userId",
  authMiddleware(Roles.admin),
  userController.deleteUser
);

export const userRouter = router;

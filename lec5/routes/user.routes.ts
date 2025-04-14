import { Router, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { UserService } from "../services/user.service";

const router = Router();
const userService = new UserService();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const user = plainToInstance(User, req.body);
  const errors = await validate(user);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const savedUser = await userService.createUser(user);
    return res.status(201).json(savedUser);
  } catch (err: any) {
    if (err?.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;

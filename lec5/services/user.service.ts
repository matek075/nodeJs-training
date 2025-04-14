import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async createUser(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }
}

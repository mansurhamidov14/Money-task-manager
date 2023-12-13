import { database, type Database } from "@app/db";
import { User } from "@app/stores";
import { RegisterUser } from "./types";

class UserService {
  private static EmailAlreadyRegisteredException = "EmailAlreadyRegisteredException";
  private static WrongEmailOrPasswordException = "WrongEmailOrPasswordException";
  private static BrowserStorageItemKey = "moneyAppAuthorizedUser";

  constructor (private db: Database) {}
  async signUp(user: RegisterUser): Promise<User> {
    try {
      const newUser = await this.db.create<RegisterUser>("users", user);
      return newUser;
    } catch (error) {
      throw new Error(UserService.EmailAlreadyRegisteredException);
    }
  }

  async getAuthorizedUser(): Promise<User | null> {
    const userDataStr = localStorage.getItem(UserService.BrowserStorageItemKey);

    if (userDataStr) {
      const userData: Pick<User, "id" | "email"> = JSON.parse(userDataStr);
      const user = await this.db.getById<User>("users", userData.id);

      if (!user) {
        localStorage.removeItem(UserService.BrowserStorageItemKey);
      }

      return user;
    }
    
    return null;
  }

  async auth(email: string, password: string): Promise<User> {
    const [user] = await this.db.queryAll<User>("users", [
      ["email", "password"],
      [email, password]
    ]);

    if (!user) {
      localStorage.removeItem("moneyAppAuthorizedUser");
      throw new Error(UserService.WrongEmailOrPasswordException)
    }

    localStorage.setItem("moneyAppAuthorizedUser", JSON.stringify({
      id: user.id,
      email: user.email
    }));
    return user;
  }
}

export const userService = new UserService(database);

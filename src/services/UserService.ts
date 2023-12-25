import type { IDBCollection } from "@app/adapters/IDB";
import { userCollection } from "@app/db";
import { User } from "@app/stores";
import { RegisterUser } from "./types";

class UserService {
  private static EmailAlreadyRegisteredException = "EmailAlreadyRegisteredException";
  private static WrongEmailOrPasswordException = "WrongEmailOrPasswordException";
  private static BrowserStorageItemKey = "WFOAppAuthorizedUser";

  constructor (private collection: IDBCollection<User>) {}
  async signUp(user: RegisterUser): Promise<User> {
    try {
      const newUser = await this.collection.create(user);
      localStorage.setItem(UserService.BrowserStorageItemKey, JSON.stringify({
        id: newUser.id,
        email: newUser.email
      }));
      return newUser;
    } catch (error) {
      throw new Error(UserService.EmailAlreadyRegisteredException);
    }
  }

  async getAuthorizedUser(): Promise<User | null> {
    const userDataStr = localStorage.getItem(UserService.BrowserStorageItemKey);

    if (userDataStr) {
      const userData: Pick<User, "id" | "email"> = JSON.parse(userDataStr);
      const user = await this.collection.queryOne(userData.id);

      if (!user) {
        localStorage.removeItem(UserService.BrowserStorageItemKey);
      }

      return user;
    }
    
    return null;
  }

  async auth(email: string, password: string): Promise<User> {
    const [user] = await this.collection.queryAll([
      ["email", "password"],
      [email, password]
    ]);

    if (!user) {
      localStorage.removeItem(UserService.BrowserStorageItemKey);
      throw new Error(UserService.WrongEmailOrPasswordException)
    }

    localStorage.setItem(UserService.BrowserStorageItemKey, JSON.stringify({
      id: user.id,
      email: user.email
    }));
    return user;
  }

  async userExist(email: string): Promise<boolean> {
    const user = await this.collection.queryOne(["email", email.toLowerCase()]);
    return Boolean(user);
  }

  update(id: number, data: Partial<User>) {
    return this.collection.update(id, data);
  }

  async logOut() {
    localStorage.removeItem(UserService.BrowserStorageItemKey);
    return true;
  }
}

export const userService = new UserService(userCollection);

import type { IDBCollection, UserDbData } from "@app/adapters/IDB";
import { userCollection } from "@app/db";
import { User } from "@app/stores";
import { t } from "@app/i18n";
import { NewUser } from ".";

class UserService {
  private static EmailAlreadyRegisteredException = "EmailAlreadyRegisteredException";
  private static WrongEmailOrPasswordException = "WrongEmailOrPasswordException";
  private static BrowserStorageItemKey = "WFOAppAuthorizedUser";

  constructor (private collection: IDBCollection<UserDbData>) {}
  async signUp(user: NewUser): Promise<User> {
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

      if (user) {
        const { password, pinCode, ...rest } = user;
        return rest;
      }
    }
    
    return null;
  }

  async auth(email: string, password: string): Promise<User> {
    const user = await this.getByEmailAndPassword(email, password);

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
    const user = await this.collection.queryOne({ email: email.toLowerCase() });
    return Boolean(user);
  }

  update(id: number, data: Partial<UserDbData>) {
    return this.collection.update(id, data);
  }

  async resetPassword(currentUser: User, oldPassword: string, newPassword: string) {
    const user = await this.getByEmailAndPassword(currentUser.email, oldPassword);

    if (user) {
      return this.collection.update(currentUser.id, { password: newPassword } as any);
    } else {
      throw new Error(t("SettingsScreen.changePassword.invalidPassword"));
    }
  }

  async setUpPinProtection(user: User, newPin: string, prevPin?: string) {
    const isValid = this.validatePin(user.id, prevPin);

    if (!isValid) {
      throw new Error("PIN is incorrect");
    }

    await this.update(user.id, { pinCode: newPin, hasPinProtection: 1 });
  }

  async logOut() {
    localStorage.removeItem(UserService.BrowserStorageItemKey);
    return true;
  }

  async getByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await this.collection.queryOne({ email: email.toLowerCase(), password });

    return user;
  }

  async validatePin(id: number, pinCode?: string) {
    const user = await this.collection.queryOne(id);

    if (user && !user.hasPinProtection) {
      return true;
    }

    if (pinCode) {
      const validUser = await this.collection.queryOne({ id, pinCode });
      if (validUser) {
        return true;
      }
    }

    return false;
  }

  async removePinProtectionByPassword(email: string, password: string) {
    const user = await this.getByEmailAndPassword(email, password);

    if (user) {
      await this.update(user.id, { hasPinProtection: 0, pinCode: undefined });
    } else {
      throw new Error(t("AuthScreen.PINInput.invalidPassword"));
    }
  }
}

export const userService = new UserService(userCollection);

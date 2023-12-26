import { createSignal } from "solid-js";
import { UserStore } from "./types";
import { userService } from "@app/services";
import { transactionsStore } from "..";

const [currentUser, setCurrentUser] = createSignal<UserStore>({
  isAuthorized: false,
  isLoading: true
});

const updateUserData = (data: Partial<UserStore["data"]>) => {
  setCurrentUser(value => ({
    ...value,
    data: {
      ...value.data!,
      ...data
    }
  }));
}

const logOut = () => {
  userService.logOut();
    setCurrentUser({
      isLoading: true,
      isAuthorized: false
    });
    setTimeout(() => {
      setCurrentUser({ isLoading: false, isAuthorized: false });
      transactionsStore.setTransactionsLoading();
    }, 500);
}

export const user = { currentUser, setCurrentUser, updateUserData, logOut };

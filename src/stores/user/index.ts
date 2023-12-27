import { createRoot, createSignal } from "solid-js";
import { UserStore } from "./types";
import { userService } from "@app/services";
import { transactionsStore } from "..";



function initUserStore() {
  const [currentUser, setCurrentUser] = createSignal<UserStore>({
    status: "loading"
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
      setCurrentUser({ status: "loading" });
      setTimeout(() => {
        setCurrentUser({ status: "unauthorized" });
        transactionsStore.setTransactionsLoading();
      }, 500);
  }

  return {
    currentUser,
    setCurrentUser,
    logOut,
    updateUserData
  }
}

export const user = createRoot(initUserStore);

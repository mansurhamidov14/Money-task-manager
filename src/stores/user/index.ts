import { createRoot, createSignal } from "solid-js";
import { UserStore } from "./types";
import { authService } from "@app/services";
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
  
  const logOut = async () => {
    setCurrentUser({ status: "loading" });
    await authService.logOut();
    setCurrentUser({ status: "unauthorized" });
    transactionsStore.setTransactionsLoading();
  }

  return {
    currentUser,
    setCurrentUser,
    logOut,
    updateUserData
  }
}

export const user = createRoot(initUserStore);

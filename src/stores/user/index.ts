import { createSignal } from "solid-js";
import { UserStore } from "./types";

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

export const user = { currentUser, setCurrentUser, updateUserData };

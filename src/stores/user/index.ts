import { createSignal } from "solid-js";
import { UserStore } from "./types";

const [currentUser, setCurrentUser] = createSignal<UserStore>({
  isAuthorized: false,
  isLoading: true
});

export const user = { currentUser, setCurrentUser };

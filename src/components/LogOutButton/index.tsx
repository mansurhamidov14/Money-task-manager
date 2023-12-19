import { IoLogOutOutline } from "solid-icons/io";
import { transactionsStore, user } from "@app/stores"
import { Button } from "../Button";
import { userService } from "@app/services";

export function LogOutButton() {
  const handleClick = () => {
    userService.logOut();
    user.setCurrentUser({
      isLoading: true,
      isAuthorized: false
    });
    setTimeout(() => {
      user.setCurrentUser({ isLoading: false, isAuthorized: false });
      transactionsStore.setTransactionsoreLoading();
    }, 500);
  }
  return (
    <Button class="w-10 h-10 text-xl" size="md" variant="glass" type="button" onClick={handleClick}>
      <IoLogOutOutline />
    </Button>
  );
}

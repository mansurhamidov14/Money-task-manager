import { Account } from "@app/entities";
import { useAsyncData } from "@app/hooks";
import { accountService } from "@app/services";
import { createContext, onMount, ParentProps } from "solid-js";
import { DataContextType } from "./types";
import { tasksStore, user } from "../../stores";
import { BottomNavigation } from "@app/components";

export const DataContext = createContext<DataContextType>();

export function DataProvider(props: ParentProps) {
  const userId = user.currentUser().data!.id;
  const [
    accounts,
    fetchAccounts,
    setAccounts,
    setAccountsLoading
  ] = useAsyncData<Account[]>();

  const refetchAccounts = () => fetchAccounts(() => accountService.getUserAccounts());

  onMount(() => {
    if (accounts().status === "loading") {
      refetchAccounts();
    }

    if (tasksStore.tasks().status === "loading") {
      tasksStore.fetchUserTasks(userId);
    }
  });

  return (
    <DataContext.Provider value={{ accounts, setAccounts, setAccountsLoading, refetchAccounts }}>
      {props.children}
      <BottomNavigation />
    </DataContext.Provider>
  );
}
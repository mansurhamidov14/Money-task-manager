import { Account } from "@app/entities";
import { useAsyncData } from "@app/hooks";
import { accountService } from "@app/services";
import { createContext, createEffect, ParentProps, Show } from "solid-js";
import { DataContextType } from "./types";
import { tasksStore, user } from "@app/stores";

export const DataContext = createContext<DataContextType>();

function DataProviderInner(props: ParentProps) {
  const [
    accounts,
    fetchAccounts,
    setAccounts,
    reloadAccounts,
    waitForAccountsUpdate
  ] = useAsyncData<Account[]>();

  createEffect(() => {
    if (accounts().status === "initial") {
      fetchAccounts(() => accountService.getUserAccounts());
    }
    
  });
  createEffect(() => {
    if (tasksStore.tasks().status === "initial") {
      tasksStore.fetchUserTasks(user.currentUser().data!.id);
    }
  })

  return (
    <DataContext.Provider value={{ accounts, setAccounts, reloadAccounts, waitForAccountsUpdate }}>
      {props.children}
    </DataContext.Provider>
  );
}

export const DataProvider = (props: ParentProps) => {
  return (
    <Show when={user.currentUser().status === "authorized"} fallback={props.children}>
      <DataProviderInner>
        {props.children}
      </DataProviderInner>
    </Show>
  );
};
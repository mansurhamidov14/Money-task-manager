import { Account, Task } from "@app/entities";
import { useAsyncData } from "@app/hooks";
import { accountService, taskService } from "@app/services";
import { user } from "@app/stores";
import { ParentProps, Show, createContext, createEffect } from "solid-js";
import { DataContextType } from "./types";

export const DataContext = createContext<DataContextType>();

function DataProviderInner(props: ParentProps) {
  const [
    accounts,
    fetchAccounts,
    setAccounts,
    reloadAccounts,
    waitForAccountsUpdate
  ] = useAsyncData<Account[]>();

  const [
    tasks,
    fetchTasks,
    setTasks,
    reloadTasks,
    waitForTasksUpdate
  ] = useAsyncData<Task[]>();

  createEffect(() => {
    if (accounts().status === "initial") {
      fetchAccounts(() => accountService.getUserAccounts());
    }
  });

  createEffect(() => {
    if (tasks().status === "initial") {
      fetchTasks(() => taskService.getList());
    }
  });

  return (
    <DataContext.Provider
      value={{
        accounts,
        setAccounts,
        reloadAccounts,
        waitForAccountsUpdate,
        tasks,
        setTasks,
        reloadTasks,
        waitForTasksUpdate
      }}
    >
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
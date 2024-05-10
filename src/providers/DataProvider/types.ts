import { Account, Task } from "@app/entities";
import { AsyncData } from "@app/hooks";
import { Accessor, Setter } from "solid-js";

export type AccountsData = AsyncData<Account[]>;
export type TasksData = AsyncData<Task[]>

export type DataContextType = {
  accounts: Accessor<AccountsData>;
  setAccounts: Setter<AccountsData>;
  waitForAccountsUpdate: () => void;
  reloadAccounts: () => void;
  tasks: Accessor<TasksData>;
  setTasks: Setter<TasksData>;
  waitForTasksUpdate: () => void;
  reloadTasks: () => void;
}
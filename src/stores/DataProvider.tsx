import { onMount, ParentProps } from "solid-js";
import { accountsStore, tasksStore, transactionsStore, user } from ".";

export function DataProvider(props: ParentProps) {
  onMount(async () => {
    const userId = user.currentUser().data!.id;
    if (transactionsStore.transactions().status !== "success") {
      await transactionsStore.fetchUserTransactions(userId);
    }

    if (accountsStore.accounts().status !== "success") {
      await accountsStore.fetchUserAccounts();
    }

    if (tasksStore.tasks().status === "loading") {
      await tasksStore.fetchUserTasks(userId);
    }
  });

  return (<>{props.children}</>)
}
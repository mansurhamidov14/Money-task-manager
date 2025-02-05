import { Account } from "@app/entities";
import { DataContext } from "@app/providers";
import { accountService } from "@app/services";
import { toastStore } from "@app/stores";
import { createMemo, useContext } from "solid-js";

export function useAccounts() {
  const context = useContext(DataContext);

  if (!context) {
    console.error('`useAccounts` hook can not be called outside of `<DataProvider />`');
    throw new Error('`useAccounts` hook can not be called outside of `<DataProvider />`');
  }

  const { accounts, setAccounts, reloadAccounts, waitForAccountsUpdate } = context;

  const primaryAccount = createMemo(() => {
    if (accounts().status !== "success") {
      return null;
    }

    return accounts().data!.find(account => account.primary);
  });

  const deleteAccount = async (id: Account['id']) => {
    const currentState = accounts();
    waitForAccountsUpdate();
    let success = false;
    try {
      await accountService.delete(id);
      currentState.data = currentState.data?.filter(account => account.id !== id);
      success = true;
    } catch (e: any) {
      console.error(e);
      toastStore.handleServerError(e);
    } finally {
      setAccounts(currentState);
      return success;
    }
  }

  const patchAccount = (data: Account) => {
    if (accounts().status !== "success") return;

    setAccounts(state => ({
      status: "success",
      data: state.data?.map(account => (
        account.id !== data.id
          ? account
          : ({ ...account, ...data })
      ))
    }));
  }

  return {
    accounts,
    setAccounts,
    reloadAccounts,
    deleteAccount,
    primaryAccount,
    waitForAccountsUpdate,
    patchAccount
  };
}
import { createRoot, createSignal } from "solid-js";
import { Account, AccountsStore } from "../index";
import { accountService } from "@app/services";

function initAccountsStore() {
  const [accounts, setAccounts] = createSignal<AccountsStore>({ status: "loading" });

  const setAccountsData = (accounts: Account[]) => setAccounts({ status: "success", data: accounts });
  const setAccountsLoading = () => setAccounts({ status: "loading" });
  const setAccountsError = (error: string) => setAccounts({ status: "error", error });

  const fetchUserAccounts = async (userId: number) => {
    try {
      const accounts = await accountService.getUserAccounts(userId);
      setAccountsData(accounts);
    } catch (e: any) {
      setAccountsError(e.message);
    }
  }

  const addAccount = (newAccount: Account) => setAccountsData([...accounts().data!, newAccount]);

  return {
    accounts,
    addAccount,
    setAccountsData,
    setAccountsLoading,
    setAccountsError,
    fetchUserAccounts
  }
}

export const accountsStore = createRoot(initAccountsStore);
// @ts-ignore
window.accounts = accountsStore.accounts;

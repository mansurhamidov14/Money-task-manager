import { createRoot, createSignal } from "solid-js";
import { Account, AccountsStore, TransactionType, transactionsStore } from "../index";
import { accountService } from "@app/services";
import { counters, initCountersStore } from "./counters";
import { MS_IN_DAY } from "@app/constants";

function initAccountsStore() {
  const [accounts, setAccounts] = createSignal<AccountsStore>({ status: "loading" });

  const setAccountsData = (accounts: Account[]) => {
    setAccounts({ status: "success", data: accounts });
    window.dispatchEvent(new CustomEvent("accountsstoreupdated"));
  }
  const setAccountsLoading = () => setAccounts({ status: "loading" });
  const setAccountsError = (error: string) => setAccounts({ status: "error", error });

  const fetchUserAccounts = async (userId: number) => {
    try {
      const accounts = await accountService.getUserAccounts(userId);
      const endTimestamp = Date.now();
      const startDate = new Date(endTimestamp - 30 * MS_IN_DAY);
      startDate.setHours(0, 0, 0, 0);
      const startTimestamp = startDate.getTime();
      accounts.forEach(account => {
        if (counters[account.id]) {
          return;
        }

        const accountTransactions = transactionsStore.transactions().data!.filter(t => (
          t.createdAt >= startTimestamp &&
            t.createdAt <= endTimestamp &&
            t.account === account.id
        ));

        counters[account.id] = initCountersStore(accountTransactions);
      });
      setAccountsData(accounts);
    } catch (e: any) {
      setAccountsError(e.message);
    }
  }

  const updateAccount = async (id: number, data: Partial<Account>) => {
    await accountService.update(id, data);
    setAccountsData(accounts().data!.map(account => {
      if (account.id !== id) return account;
      return {
        ...account,
        ...data
      }
    }));
  }

  const addAccount = (newAccount: Account) => setAccountsData([...accounts().data!, newAccount]);

  const removePrimaryFlag = async (user: number) => {
    await accountService.update({ primary: 1, user }, { primary: 0 });
    setAccountsData(accounts().data!.map(account => account.primary
      ? { ...account, primary: 0 }
      : account 
    ));
  }

  const changeBalance = (id: number, amount: number, type: TransactionType) => {
    const difference = type === "expense" ? amount * -1 : amount;
    setAccountsData(accounts().data!.map(account => {
      if (account.id !== id) return account;

      return {
        ...account,
        balance: account.balance + difference
      };
    }));

    if (type === "income") {
      counters[id].setTotalIncome(prev => prev += amount);
    } else {
      counters[id].setTotalExpense(prev => prev += amount);
    }

    return accountService.update(id, oldData => ({
      ...oldData,
      balance: oldData.balance + difference
    }));
  }

  const deleteAccount = async (id: number) => {
    await accountService.delete(id);
    setAccountsData(accounts().data!.filter(a => a.id !== id));
  }

  return {
    accounts,
    addAccount,
    deleteAccount,
    setAccountsData,
    setAccountsLoading,
    setAccountsError,
    updateAccount,
    changeBalance,
    fetchUserAccounts,
    removePrimaryFlag
  }
}

export const accountsStore = createRoot(initAccountsStore);

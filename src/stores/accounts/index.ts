import { createMemo, createRoot, createSignal } from "solid-js";
import { Account, AccountsStore, TransactionType, transactionsStore } from "../index";
import { accountService } from "@app/services";
import { counters, initCountersStore } from "./counters";
import { MS_IN_DAY } from "@app/constants";

function initAccountsStore() {
  const [accounts, setAccounts] = createSignal<AccountsStore>({ status: "loading" });

  const setAccountsData = (accounts: Account[]) => {
    setAccounts({ status: "success", data: accounts });
  }
  const setAccountsLoading = () => setAccounts({ status: "loading" });
  const setAccountsError = (error: string) => setAccounts({ status: "error", error });

  /** This function prevents accounts slider from getting broken */
  const reload = () => {
    if (accounts().status === "success") {
      const data = accounts().data!;
      setAccountsLoading();
      setTimeout(() => {
        setAccountsData(data);
      }, 10);
    }
  }

  const fetchUserAccounts = async () => {
    try {
      const { data: accounts} = await accountService.getUserAccounts();
      const endTimestamp = Date.now();
      const startDate = new Date(endTimestamp - 30 * MS_IN_DAY);
      startDate.setHours(0, 0, 0, 0);
      const timestamp = startDate.getTime();
      accounts.forEach(account => {
        if (counters[account.id]) {
          return;
        }

        const accountTransactions = transactionsStore.transactions().data!.filter(t => (
          t.createdAt >= timestamp &&
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

  const changeBalance = (id: Account['id'], amount: number, type: TransactionType) => {
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
    return accountService.changeBalance(id, difference);
  }

  const deleteAccount = async (id: Account['id']) => {
    await accountService.delete(id);
    setAccountsData(accounts().data!.filter(a => a.id !== id));
  }

  const primaryAccount = createMemo(() => {
    const _accounts = accounts();
    if (_accounts.status !== "success") {
      return null;
    }

    return _accounts.data!.find(account => account.primary) || _accounts.data![0];
  });

  return {
    accounts,
    primaryAccount,
    deleteAccount,
    setAccountsData,
    setAccountsLoading,
    setAccountsError,
    changeBalance,
    fetchUserAccounts,
    reload
  }
}

export const accountsStore = createRoot(initAccountsStore);

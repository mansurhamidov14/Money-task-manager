import { IoWalletOutline } from "solid-icons/io";
import "./App.css";
import {
  AccountNavLink,
  AddNewNavButton,
  BottomNavigation,
  ExpenseAmountCard,
  HistoryNavLink,
  HomeNavLink,
  IncomeAmountCard,
  TransactionGroup,
  TransactionList,
  TransactionListItem
} from "./components";
import { t } from "./i18n";
import { groupTransactionsByDate, transactions } from "./stores";


function App() {
  return (
    <div class="layout grid h-screen">
      <main class="bg-slate-50 py-3 px-5">
        <div class="flex flex-col items-center gap-3 py-5">
          <div class="font-bold text-3xl">
            $2,500.50
          </div>
          <div class="text-slate-400 font-medium text-sm">{t("totalBalance")}</div>
        </div>
        <div class="flex gap-5 mb-6">
          <IncomeAmountCard amount="$540" />
          <ExpenseAmountCard amount="$200" />
        </div>
        <TransactionList>
          {groupTransactionsByDate(transactions.getLatestTransactions()).map((group) => (
            <TransactionGroup date={group.date}>
              {group.transactions.map(transaction => (
                <TransactionListItem {...transaction} />
              ))}
            </TransactionGroup>
          ))}          
        </TransactionList>
      </main>
      <BottomNavigation>
        <HomeNavLink active />
        <AddNewNavButton />
        <HistoryNavLink />
      </BottomNavigation>
    </div>
  )
}

export default App

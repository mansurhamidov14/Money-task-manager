import {
  ExpenseAmountCard,
  IncomeAmountCard,
  Loading,
  SectionTitle
} from "../../components";
import { Message } from "../../i18n/components";
import { transactions } from "../../stores";
import { LatestTransactions } from "./components";

export function HomeScreen() {
  return (
    <main class="bg-secondary-50 py-3 px-5 overflow-y-scroll">
      <div class="flex flex-col items-center gap-3 py-5">
        <div class="font-bold text-3xl">
          $2,500.50
        </div>
        <div class="text-secondary-400 font-medium text-sm">
          <Message>HomeScreen.totalBalance</Message>
        </div>
      </div>
      <div class="flex gap-5 mb-6">
        <IncomeAmountCard amount="$540" />
        <ExpenseAmountCard amount="$200" />
      </div>
      <SectionTitle>
        <Message>HomeScreen.recentTransactions</Message>  
      </SectionTitle>
      {transactions.transactionsStore().isLoading
        ? <Loading />
        : <LatestTransactions />
      }
    </main>
  );
}

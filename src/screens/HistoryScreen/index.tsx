import { For, createMemo, createSignal } from "solid-js";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { initialDateRange } from "./consts";
import { DateFilter } from "./components";
import { SectionTitle, TransactionGroup, TransactionList, TransactionListItem } from "../../components";
import { Message } from "../../i18n/components";
import { CategoryId } from "../../constants";
import { CategoryFilter } from "./components/CategoryFilter";
import { groupTransactionsByDate, transactions } from "../../stores";

export type DateFilter = "day" | "week" | "month" | "custom";


export function HistoryScreen() {
  const [previousDateFilter, setPreviousDateFilter] = createSignal<DateFilter>("month");
  const [activeDateFilter, setActiveDateFilter] = createSignal<DateFilter>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [activeCategoryFilter, setActiveCategoryFilter] = createSignal<CategoryId | null>(null);

  const filteredTransactions = createMemo(() => {
    return groupTransactionsByDate(
      transactions.getFilteredTransactions(
        activeCategoryFilter()
      )
    );
  });

  return (
    <main class="bg-secondary-50 py-3 px-5 overflow-y-scroll">
      <h1 class="text-center text-4xl">History Screen</h1>
      <DateFilter
        previousDateFilter={previousDateFilter}
        setPreviousDateFilter={setPreviousDateFilter}
        activeDateFilter={activeDateFilter}
        setActiveDateFilter={setActiveDateFilter}
        filterDateRanges={filterDateRanges}
        setFilterDateRanges={setFilterDateRanges}
      />
      <SectionTitle>
        <Message>HistoryScreen.detailTransactions</Message>
      </SectionTitle>
      <CategoryFilter
        activeCategoryFilter={activeCategoryFilter}
        setActiveCategoryFilter={setActiveCategoryFilter}
      />
      <TransactionList>
        <For each={filteredTransactions()}>
          {group => (
            <TransactionGroup date={group.date}>
              <For each={group.transactions}>
                {transaction => <TransactionListItem {...transaction} />}
              </For>
            </TransactionGroup>
          )}
        </For>
      </TransactionList>
    </main>
  );
}

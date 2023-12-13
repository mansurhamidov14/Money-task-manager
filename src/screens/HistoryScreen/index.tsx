import { createSignal } from "solid-js";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { Loading, SectionTitle } from "@app/components";
import { Message } from "@app/i18n/components";
import { CategoryId } from "@app/constants";
import { transactions } from "@app/stores";
import { initialDateRange } from "./consts";
import { CategoryFilter, DateFilter, FilteredTransactions } from "./components";

export type DateFilter = "day" | "week" | "month" | "custom";

export function HistoryScreen() {
  const [previousDateFilter, setPreviousDateFilter] = createSignal<DateFilter>("month");
  const [activeDateFilter, setActiveDateFilter] = createSignal<DateFilter>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [activeCategoryFilter, setActiveCategoryFilter] = createSignal<CategoryId | null>(null);

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
      {transactions.transactionsStore().isLoading
        ? <Loading />
        : <FilteredTransactions activeCategoryFilter={activeCategoryFilter} />
      }
    </main>
  );
}

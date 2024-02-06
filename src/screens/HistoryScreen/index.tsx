import { createMemo, createSignal } from "solid-js";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { ScreenHeader, VerticalScroll } from "@app/components";
import { t } from "@app/i18n";
import { getDateFilters } from "./helpers";
import { Await, accountsStore, transactionsStore } from "@app/stores";
import { initialDateRange } from "./consts";
import {
  CategoryFilter,
  DateFilter,
  FilteredTransactions,
  PieCharts,
  TransactionListSkeleton
} from "./components";
import { DateFilter as TDateFilter, DateFilterTab } from "./types";
import { CategoryId } from "@app/services";

export function HistoryScreen() {
  const [prevDateFilterTab, setPrevDateFilterTab] = createSignal<DateFilterTab>("month");
  const [dateFilterTab, setDateFilterTab] = createSignal<DateFilterTab>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [categoryFilter, setCategoryFilter] = createSignal<CategoryId | null>(null);
  const [dateFilter, setDateFilter] = createSignal<TDateFilter>(getDateFilters(dateFilterTab()));
  const filteredTransactions = createMemo(() => (
    transactionsStore.transactions().status === "success"
      ? transactionsStore.getFilteredTransactions(categoryFilter(), dateFilter())
      : []
  ));

  return (
    <>
      <ScreenHeader title={t("HistoryScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <main class="px-3">
          <DateFilter
            previousTab={prevDateFilterTab}
            setPreviousTab={setPrevDateFilterTab}
            activeTab={dateFilterTab}
            setActiveTab={setDateFilterTab}
            filterDateRanges={filterDateRanges}
            setFilterDateRanges={setFilterDateRanges}
            setDateFilter={setDateFilter}
          />
          <Await for={[transactionsStore.transactions(), accountsStore.accounts()]}>
            <PieCharts
              transactions={filteredTransactions}
              dateFilter={dateFilter}
            />
          </Await>
          <CategoryFilter filter={categoryFilter} setFilter={setCategoryFilter} />
          <Await for={[transactionsStore.transactions()]} fallback={<TransactionListSkeleton />}>
            <FilteredTransactions transactions={filteredTransactions} />
          </Await>
        </main>
      </VerticalScroll>
    </>
  );
}

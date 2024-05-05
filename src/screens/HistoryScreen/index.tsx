import { createSignal } from "solid-js";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { CategoryId } from "@app/entities";
import { t } from "@app/i18n";
import { getDateFilters } from "./helpers";
import { Await } from "@app/stores";
import { initialDateRange } from "./consts";
import {
  CategoryFilter,
  DateFilter,
  FilteredTransactions,
  PieCharts,
  TransactionListSkeleton
} from "./components";
import { DateFilter as TDateFilter, DateFilterTab } from "./types";
import { useAccounts, useTransactions } from "@app/hooks";

export function HistoryScreen() {
  const { accounts } = useAccounts();
  const [prevDateFilterTab, setPrevDateFilterTab] = createSignal<DateFilterTab>("month");
  const [dateFilterTab, setDateFilterTab] = createSignal<DateFilterTab>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [categoryFilter, setCategoryFilter] = createSignal<CategoryId | null>(null);
  const [dateFilter, setDateFilter] = createSignal<TDateFilter>(getDateFilters(dateFilterTab()));
  const { transactions, deleteTransaction } = useTransactions(() => ({
    ...dateFilter(),
    category: categoryFilter() ?? undefined
  }));

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
          <Await
            for={[transactions(), accounts()]}
            fallback={<div class="min-h-[7rem]"><Loading /></div>}
          >
            <PieCharts
              transactions={transactions().data!}
              dateFilter={dateFilter}
            />
          </Await>
          <CategoryFilter filter={categoryFilter} setFilter={setCategoryFilter} />
          <Await for={[transactions()]} fallback={<TransactionListSkeleton />}>
            <FilteredTransactions transactions={transactions} onDelete={deleteTransaction} />
          </Await>
        </main>
      </VerticalScroll>
    </>
  );
}

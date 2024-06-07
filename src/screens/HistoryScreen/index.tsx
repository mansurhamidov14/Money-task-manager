import { Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { CategoryId } from "@app/entities";
import { useAccounts, useTransactions } from "@app/hooks";
import { t } from "@app/i18n";
import { Await } from "@app/stores";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { createMemo, createSignal } from "solid-js";
import {
  CategoryFilter,
  DateFilter,
  FilteredTransactions,
  PieCharts,
  TransactionListSkeleton
} from "./components";
import { initialDateRange } from "./consts";
import { getDateFilters } from "./helpers";
import { DateFilterTab, DateFilter as TDateFilter } from "./types";

export function HistoryScreen() {
  const { accounts } = useAccounts();
  const [prevDateFilterTab, setPrevDateFilterTab] = createSignal<DateFilterTab>("month");
  const [dateFilterTab, setDateFilterTab] = createSignal<DateFilterTab>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [categoryFilter, setCategoryFilter] = createSignal<CategoryId | null>(null);
  const [dateFilter, setDateFilter] = createSignal<TDateFilter>(getDateFilters(dateFilterTab()));
  const { transactions, deleteTransaction } = useTransactions(dateFilter);
  const transactionsWithCategoryFilter = createMemo(() => {
    if (!categoryFilter()) {
      return transactions().data!;
    }

    return transactions().data!.filter(({ category }) => category === categoryFilter());
  });

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
            <FilteredTransactions transactions={transactionsWithCategoryFilter} onDelete={deleteTransaction} />
          </Await>
        </main>
      </VerticalScroll>
    </>
  );
}

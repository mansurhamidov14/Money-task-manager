import { createSignal } from "solid-js";
import { PickerValue } from "@rnwonder/solid-date-picker";
import { ScreenHeader, SectionTitle, VerticalScroll } from "@app/components";
import { Message, t } from "@app/i18n";
import { CategoryId } from "@app/constants";
import { Await, transactionsStore } from "@app/stores";
import { initialDateRange } from "./consts";
import {
  CategoryFilter,
  DateFilter,
  FilteredTransactions,
  TransactionListSkeleton
} from "./components";
import { DateFilter as TDateFilter, DateFilterTab } from "./types";
import { getDateFilters } from "./helpers";

export function HistoryScreen() {
  const [prevDateFilterTab, setPrevDateFilterTab] = createSignal<DateFilterTab>("month");
  const [dateFilterTab, setDateFilterTab] = createSignal<DateFilterTab>("month");
  const [filterDateRanges, setFilterDateRanges] = createSignal<PickerValue>(initialDateRange);
  const [categoryFilter, setCategoryFilter] = createSignal<CategoryId | null>(null);
  const [dateFilter, setDateFilter] = createSignal<TDateFilter>(getDateFilters(dateFilterTab()));

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
        <SectionTitle>
          <Message>HistoryScreen.detailTransactions</Message>
        </SectionTitle>
        <CategoryFilter filter={categoryFilter} setFilter={setCategoryFilter} />
        <Await for={[transactionsStore.transactions()]} fallback={<TransactionListSkeleton />}>
          <FilteredTransactions
            dateFilter={dateFilter}
            categoryFilter={categoryFilter}
          />
        </Await>
        </main>
      </VerticalScroll>
    </>
  );
}

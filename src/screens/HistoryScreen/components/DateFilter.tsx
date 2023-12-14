import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { Accessor, Setter } from "solid-js"
import { IoCalendarOutline } from "solid-icons/io";
import { FilterTab } from "@app/components";
import { Action, Message } from "@app/i18n/components";
import { initialDateRange } from "../consts";
import { DateFilter as TDateFilter, DateFilterTab } from "../types"
import { getDateFilters } from "../helpers";

let closeDatePickerRef: HTMLButtonElement;
export type DateFilterProps = {
  activeTab: Accessor<DateFilterTab>;
  setActiveTab: Setter<DateFilterTab>;
  previousTab: Accessor<DateFilterTab>;
  setPreviousTab: Setter<DateFilterTab>;
  filterDateRanges: Accessor<PickerValue>;
  setFilterDateRanges: Setter<PickerValue>;
  setDateFilter: Setter<TDateFilter>;
}

export function DateFilter({
  activeTab,
  setActiveTab,
  previousTab,
  setPreviousTab,
  filterDateRanges,
  setFilterDateRanges,
  setDateFilter
}: DateFilterProps) {
  const handleDateFilterSwitch = (filter: DateFilterTab) => {
    setActiveTab(filter);
    if (filter !== "custom") {
      setDateFilter(getDateFilters(filter));
    }
  }

  const handleDateRangeApply = () => {
    closeDatePickerRef.click();
  }
  return (
    <div class="overflow-x-auto mx-[-0.5em] px-2">
      <div class="flex gap-2 py-5 w-fit">
        {(["day", "week", "month"] as DateFilterTab[]).map((filterType) => (
          <FilterTab
            id={filterType}
            onSwitch={handleDateFilterSwitch}
            active={() => activeTab() === filterType}
          >
            <Message>{`HistoryScreen.DateFilters.${filterType}`}</Message>
          </FilterTab>
        ))}
        <DatePicker
          value={filterDateRanges}
          setValue={setFilterDateRanges}
          type="range"
          onClose={() => {
            const filterRanges = filterDateRanges();
            if (!filterRanges.value.end || !filterRanges.value.start) {
              setActiveTab(previousTab());
              setFilterDateRanges(initialDateRange);
            } else {
              setDateFilter(getDateFilters(activeTab(), filterRanges))
            }
          }}
          formatInputLabelRangeStart="d/m/yy"
          formatInputLabelRangeEnd="d/m/yy"
          calendarBottomAreaJSX={() => (
            <div class="flex p-3">
              <button
                class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                disabled={!filterDateRanges().value.start || !filterDateRanges().value.end}
                onClick={handleDateRangeApply}
              >
                <Action>Apply</Action>
              </button>
            </div>
          )}
          renderInput={({ showDate, value }) => {
            return (
              <FilterTab
                id="custom"
                active={() => activeTab() === "custom"}
                onClick={() => {
                  showDate();
                  setPreviousTab(activeTab());
                  setActiveTab("custom");
                }}
              >
                <span
                  class={`text-xl ${activeTab() === "custom" ? "text-primary-500" : "text-secondary-900"}`}
                >
                  <IoCalendarOutline />
                </span>&nbsp;&nbsp;{value().label || <Message>{`HistoryScreen.DateFilters.custom`}</Message>}
              </FilterTab>
            );
          }}
          pickerPositionX="center"
        />
        <button hidden type="button" ref={closeDatePickerRef}></button>
      </div>
    </div>
    
  );
}
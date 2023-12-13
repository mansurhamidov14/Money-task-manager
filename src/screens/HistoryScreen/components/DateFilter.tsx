import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { Accessor, Setter } from "solid-js"
import { IoCalendarOutline } from "solid-icons/io";
import { FilterTab } from "@app/components";
import { Action, Message } from "@app/i18n/components";
import { initialDateRange } from "../consts";
import { DateFilterType } from "../types"

let closeDatePickerRef: HTMLButtonElement;
export type DateFilterProps = {
  activeDateFilter: Accessor<DateFilterType>;
  setActiveDateFilter: Setter<DateFilterType>;
  previousDateFilter: Accessor<DateFilterType>;
  setPreviousDateFilter: Setter<DateFilterType>;
  filterDateRanges: Accessor<PickerValue>;
  setFilterDateRanges: Setter<PickerValue>;
}

export function DateFilter({
  activeDateFilter,
  setActiveDateFilter,
  previousDateFilter,
  setPreviousDateFilter,
  filterDateRanges,
  setFilterDateRanges
}: DateFilterProps) {
  const handleDateFilterSwitch = (filter: DateFilterType) => {
    setActiveDateFilter(filter);
  }

  const handleDateRangeApply = () => {
    closeDatePickerRef.click();
  }
  return (
    <div class="overflow-x-auto mx-[-1.2rem] px-5">
      <div class="flex gap-2 py-5 w-fit">
        {(["day", "week", "month"] as DateFilterType[]).map((filterType) => (
          <FilterTab
            id={filterType}
            onSwitch={handleDateFilterSwitch}
            active={() => activeDateFilter() === filterType}
          >
            <Message>{`HistoryScreen.DateFilters.${filterType}`}</Message>
          </FilterTab>
        ))}
        <DatePicker
          value={filterDateRanges}
          setValue={setFilterDateRanges}
          type="range"
          onClose={() => {
            if (!filterDateRanges().value.end || !filterDateRanges().value.start) {
              setActiveDateFilter(previousDateFilter());
              setFilterDateRanges(initialDateRange);
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
                active={() => activeDateFilter() === "custom"}
                onClick={() => {
                  showDate();
                  setPreviousDateFilter(activeDateFilter());
                  setActiveDateFilter("custom");
                }}
              >
                <span
                  class={`text-xl ${activeDateFilter() === "custom" ? "text-primary-500" : "text-secondary-900"}`}
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
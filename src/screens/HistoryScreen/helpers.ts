import { PickerValue } from "@rnwonder/solid-date-picker";
import { DateFilter, DateFilterTab } from "./types";

const msInDay = 24 * 3600000;

export function getDateFilters(filterType: DateFilterTab, ranges?: PickerValue): DateFilter {
  if (filterType === "custom" && !ranges) {
    throw new Error("'ranges' param is required with custom 'filterType'");
  }

  if (filterType === "custom" && ranges) {
    const startDate = new Date(ranges.value.start!);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(ranges.value.end!);
    endDate.setHours(23, 59, 59, 999);

    return {
      startTimestamp: startDate.getTime(),
      endTimestamp: endDate.getTime()
    }
  };

  const currentTimestamp = Date.now();
  switch(filterType) {
    case "month":
      return {
        startTimestamp: currentTimestamp - 30 * msInDay,
        endTimestamp: currentTimestamp
      };
    case "week":
      return {
        startTimestamp: currentTimestamp - 7 * msInDay,
        endTimestamp: currentTimestamp
      };
    case "day":
    default:
      return {
        startTimestamp: currentTimestamp - msInDay,
        endTimestamp: currentTimestamp
      };
  }
}
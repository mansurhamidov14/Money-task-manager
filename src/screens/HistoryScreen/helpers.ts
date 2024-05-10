import { PickerValue } from "@rnwonder/solid-date-picker";
import { DateFilter, DateFilterTab } from "./types";
import { MS_IN_DAY } from "@app/constants";

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
      fromDate: startDate.toDatePickerString(),
      toDate: endDate.toDatePickerString()
    }
  };

  const currentTimestamp = Date.now();
  let startDate: Date;
  switch(filterType) {
    case "month":
      startDate = new Date(currentTimestamp - 30 * MS_IN_DAY);
      break;
    case "week":
      startDate = new Date(currentTimestamp - 7 * MS_IN_DAY);
      break;
    case "day":
    default:
      startDate = new Date(currentTimestamp - 7 * MS_IN_DAY);
      break;
  }

  startDate.setHours(0, 0, 0, 0);
  return {
    fromDate: startDate.toDatePickerString(),
    toDate: new Date(currentTimestamp).toDatePickerString()
  };
}
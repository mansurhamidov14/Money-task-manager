import { MS_IN_DAY } from "@app/constants";
import { Lang } from "@app/i18n/types";

type DateFormatterDay = {
  timestamp: number;
  date: Date;
  dateString: string;
}

export class DateFormatter {
  yesterday: DateFormatterDay;
  today: DateFormatterDay;
  tomorrow: DateFormatterDay;

  constructor(
    private translateFn: (
      key: string,
      ns?: string,
      params?: Record<string, number | string>,
      lang?: Lang
    ) => string,
    private locale: string = "en-GB"
  ) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const todayTimestamp = todayDate.getTime();
    const todayDateString = todayDate.toLocaleDateString(locale);
    
    const yesterdayTimestamp = todayTimestamp - MS_IN_DAY;
    const yesterdayDate = new Date(yesterdayTimestamp);
    const yesterdayDateString = yesterdayDate.toLocaleDateString(locale);
    
    const tomorrowTimestamp = todayTimestamp + MS_IN_DAY;
    const tomorrowDate = new Date(tomorrowTimestamp);
    const tomorrowDateString = tomorrowDate.toLocaleDateString(locale);

    this.today = {
      date: todayDate,
      timestamp: todayTimestamp,
      dateString: todayDateString
    };

    this.yesterday = {
      date: yesterdayDate,
      timestamp: yesterdayTimestamp,
      dateString: yesterdayDateString
    };

    this.tomorrow = {
      date: tomorrowDate,
      timestamp: tomorrowTimestamp,
      dateString: tomorrowDateString
    };
  }

  humanize(date: Date, type: "short" | "long" = "long") {
    const dateString = date.toLocaleDateString(this.locale);

    if (this.dateStringIsToday(dateString)) {
      return this.translateFn("today", "Date");
    }

    if (this.dateStringIsYesterday(dateString)) {
      return this.translateFn("yesterday", "Date");
    }

    if (this.dateStringIsTomorrow(dateString)) {
      return this.translateFn("tomorrow", "Date");
    }

    return this.translateFn(`${type}.date.${date.getMonth()}`, "Date", { date: date.getDate() });
  }

  isToday(date: Date) {
    return date.toLocaleDateString(this.locale) === this.today.dateString;
  }

  isYesterday(date: Date) {
    return date.toLocaleDateString(this.locale) === this.yesterday.dateString;
  }

  isTomorrow(date: Date) {
    return date.toLocaleDateString(this.locale) === this.yesterday.dateString;
  }

  private dateStringIsToday(dateString: string) {
    return dateString === this.today.dateString;
  }

  private dateStringIsYesterday(dateString: string) {
    return dateString === this.yesterday.dateString;
  }

  private dateStringIsTomorrow(dateString: string) {
    return dateString === this.tomorrow.dateString;
  }
}

import { DateFormatter } from "@app/helpers";
import { t } from "@app/i18n";
import { ParentProps, createContext, useContext } from "solid-js";

const DateFormatterContext = createContext<DateFormatter>();

export function useDateFormatter() {
  return useContext(DateFormatterContext)!;
}

export function DateFormatterProvider(props: ParentProps) {
  const dateFormatter = new DateFormatter(t);

  return (
    <DateFormatterContext.Provider value={dateFormatter}>
      {props.children}
    </DateFormatterContext.Provider>
  );
}

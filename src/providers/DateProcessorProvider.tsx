import { DateProcessor } from "@app/helpers";
import { tDate } from "@app/i18n";
import { ParentProps, createContext, useContext } from "solid-js";

const DateProcessorContext = createContext<DateProcessor>();

export function useDateProcessor() {
  return useContext(DateProcessorContext)!;
}

export function DateProcessorProvider(props: ParentProps) {
  const dateProcessor = new DateProcessor(tDate);

  return (
    <DateProcessorContext.Provider value={dateProcessor}>
      {props.children}
    </DateProcessorContext.Provider>
  );
}

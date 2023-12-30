import { DateProcessor } from "@app/helpers";
import { t } from "@app/i18n";
import { ParentProps, createContext, useContext } from "solid-js";

const DateProcessorContext = createContext<DateProcessor>();

export function useDateProcessor() {
  return useContext(DateProcessorContext)!;
}

export function DateProcessorProvider(props: ParentProps) {
  const dateProcessor = new DateProcessor(t);

  return (
    <DateProcessorContext.Provider value={dateProcessor}>
      {props.children}
    </DateProcessorContext.Provider>
  );
}

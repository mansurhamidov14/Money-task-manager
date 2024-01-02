import { useDateProcessor } from "@app/providers";
import classNames from "classnames";
import { Accessor, Setter, createMemo } from "solid-js";

type WeekDayButtonProps = {
  activeWeekday: Accessor<number>;
  setActiveWeekday: Setter<number>;
  date: Date;
}

export function WeekDayButton(props: WeekDayButtonProps) {
  const dateProcessor = useDateProcessor();
  const weekday = createMemo(() => props.date.getWeekDay());
  const isActive = createMemo(() => {
    return props.activeWeekday() === weekday();
  });

  return (
    <button
      onClick={() => props.setActiveWeekday(weekday())}
      class={classNames("btn py-1.5 px-2", isActive() ? "btn-primary" : "btn-secondary")}
    >
      <div class="flex flex-col items-center">
        <div class="text-xs font-normal">{dateProcessor.humanizeWeekDay(props.date, "short")}</div>
        <div class="text-lg">{dateProcessor.getDate(props.date)}</div>
      </div>
    </button>
  );
}
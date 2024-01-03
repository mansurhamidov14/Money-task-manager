import { useDateProcessor } from "@app/providers";
import classNames from "classnames";
import { Accessor } from "solid-js";

type WeekDayButtonProps = {
  index: Accessor<number>;
  isActive: boolean;
  onClick: (index: number) => void;
  date: Date;
}

export function WeekDayButton(props: WeekDayButtonProps) {
  const dateProcessor = useDateProcessor();

  return (
    <button
      onClick={() => props.onClick(props.index())}
      class={classNames("btn py-1.5 px-2", props.isActive ? "btn-primary" : "btn-secondary")}
    >
      <div class="flex flex-col items-center">
        <div class="text-xs font-normal">{dateProcessor.humanizeWeekDay(props.date, "short")}</div>
        <div class="text-lg">{dateProcessor.getDate(props.date)}</div>
      </div>
    </button>
  );
}
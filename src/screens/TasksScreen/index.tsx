import { ScreenHeader, TaskListItem, VerticalScroll } from "@app/components";
import { MS_IN_DAY } from "@app/constants";
import { t } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { For, Show, onMount } from "solid-js";
import { WeekDayButton } from "./components";
import { createSlider } from "solid-slider";
import { tasksStore } from "@app/stores";

let sliderRef: HTMLDivElement;

export function TasksScreen() {
  const options = { duration: 1000 };
  const [slider, { current, moveTo, /**destroy */ }] = createSlider(options);

  onMount(() => {
    slider(sliderRef);
  });

  const dateProcessor = useDateProcessor();
  const weekdays = Array.range(
    dateProcessor.mondayStartTimestamp,
    dateProcessor.sundayEndTimestamp, MS_IN_DAY
  )
    .map((timestamp) => new Date(timestamp));

  return (
    <main>
      <ScreenHeader title={t("TasksScreen.title")} />
      <VerticalScroll hasBottomNavigation hasHeader>
        <div class="flex gap-3 justify-center py-4">
          <For each={weekdays}>
            {(date, index) => (
              <WeekDayButton
                index={index}
                isActive={current() === index()}
                onClick={moveTo}
                date={date}
              />
            )}
          </For>
        </div>
        <div ref={sliderRef}>
          <For each={weekdays}>
            {date => (
              <div class="py-1 px-5">
                <Show when={tasksStore.tasksByWeekDay()[date.getWeekDay()]}>
                  <For each={tasksStore.tasksByWeekDay()[date.getWeekDay()]!}>
                    {task => <TaskListItem {...task} />}
                  </For>
                </Show>
              </div>
            )}
          </For>
        </div>
      </VerticalScroll>
    </main>
  );
}

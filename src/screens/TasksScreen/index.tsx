import { ScreenHeader, VerticalScroll } from "@app/components";
import { MS_IN_DAY } from "@app/constants";
import { t } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { For, createSignal } from "solid-js";
import { WeekDayButton } from "./components";

export function TasksScreen() {
  const [activeWeekday, setActiveWeekday] = createSignal(new Date().getWeekDay());
  const dateProcessor = useDateProcessor();
  const weekdays = Array.range(
    dateProcessor.mondayStartTimestamp,
    dateProcessor.sundayEndTimestamp, MS_IN_DAY
  );
  return (
    <main>
      <ScreenHeader title={t("TasksScreen.title")} />
      <VerticalScroll hasBottomNavigation hasHeader>
        <div class="flex gap-3 justify-center py-4">
          <For each={weekdays}>
            {timestamp => (
              <WeekDayButton activeWeekday={activeWeekday}
                setActiveWeekday={setActiveWeekday}
                date={new Date(timestamp)}
              />
            )}
          </For>
        </div>
      </VerticalScroll>
    </main>
  );
}

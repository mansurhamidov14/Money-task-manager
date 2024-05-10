import { EmptyList, SectionTitle, TaskListItem } from "@app/components";
import { useTasks } from "@app/hooks";
import { Message } from "@app/i18n";
import { Await } from "@app/stores";
import { BiRegularTaskX } from "solid-icons/bi";
import { For, Show } from "solid-js";

export function TasksOfTheDay() {
  const { tasks, todayTasks } = useTasks();
  return (
    <>
      <SectionTitle>
        <Message>HomeScreen.tasksOfTheDay</Message>
      </SectionTitle>
      <Await for={[tasks()]}>
        <Show when={todayTasks().length} fallback={(
          <EmptyList icon={<BiRegularTaskX />}>
            <Message>
              HomeScreen.noTasksForToday
            </Message>
          </EmptyList>
        )}>
          <div class="py-3">
            <For each={todayTasks()}>
              {task => <TaskListItem {...task} />}
            </For>
          </div>
        </Show>
      </Await>
    </>
  );
}
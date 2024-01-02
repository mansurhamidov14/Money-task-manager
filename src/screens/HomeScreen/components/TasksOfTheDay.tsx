import { EmptyList, SectionTitle, TaskListItem } from "@app/components";
import { Message } from "@app/i18n";
import { Await, tasksStore } from "@app/stores";
import { BiRegularTaskX } from "solid-icons/bi";
import { For, Show } from "solid-js";

export function TasksOfTheDay() {
  return (
    <>
      <SectionTitle>
        <Message>HomeScreen.tasksOfTheDay</Message>
      </SectionTitle>
      <Await for={[tasksStore.tasks()]}>
        <Show when={tasksStore.todayTasks().length} fallback={(
          <EmptyList icon={<BiRegularTaskX />}>
            <Message>
              HomeScreen.noTasksForToday
            </Message>
          </EmptyList>
        )}>
          <div class="py-3">
            <For each={tasksStore.todayTasks()}>
              {task => <TaskListItem {...task} />}
            </For>
          </div>
        </Show>
      </Await>
    </>
  );
}
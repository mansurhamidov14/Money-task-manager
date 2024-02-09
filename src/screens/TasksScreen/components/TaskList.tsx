import { For, Show } from "solid-js";
import { BsArrowRepeat } from "solid-icons/bs";
import { IoCalendarNumberOutline } from "solid-icons/io";
import { EmptyList, List, ListItem, ScreenHeader, VerticalScroll } from "@app/components";
import { useDateProcessor } from "@app/providers";
import { Await, Task, tasksStore } from "@app/stores";
import { TaskListSkeleton } from ".";
import { BiRegularTaskX } from "solid-icons/bi";
import { t } from "@app/i18n";

export type TasksListProps = {
  tasks: Task[];
  title: string;
}

export function TaskList(props: TasksListProps) {
  const dateProcessor = useDateProcessor();
  return (
    <main>
      <ScreenHeader title={props.title} withGoBackButton />
      <VerticalScroll hasBottomNavigation hasHeader>
        <div class="px-3 py-4">
          <Await for={[tasksStore.tasks()]} fallback={<TaskListSkeleton elementsCount={4} />}>
            <Show
              when={props.tasks.length}
              fallback={<EmptyList icon={<BiRegularTaskX />} children={t("common.emptyList")} />}
            >
              <List>
                <For each={props.tasks}>
                  {task => (
                    <ListItem
                      title={task.title}
                      description={
                        <>
                          {dateProcessor.humanize(new Date(task.startDate))}
                          <Show when={task.isRecurring}>
                            {" - "}
                            {task.endDate ? dateProcessor.humanize(new Date(task.endDate)) : "∞"}
                          </Show>
                        </>
                      }
                      icon={
                        <div class="h-full flex justify-center items-center bg-gray-100 text-gray-600">
                          {task.isRecurring ? <BsArrowRepeat size={28} /> : <IoCalendarNumberOutline size={28} />}
                        </div>
                      }
                    />
                  )}
                </For>
              </List>
            </Show>
          </Await>
        </div>
      </VerticalScroll>
    </main>
  );
};

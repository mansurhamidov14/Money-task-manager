import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import { BiRegularTaskX } from "solid-icons/bi";
import { BsArrowRepeat } from "solid-icons/bs";
import { IoCalendarNumberOutline, IoTrash } from "solid-icons/io";
import { EmptyList, List, ListItem, ScreenHeader, VerticalScroll } from "@app/components";
import { t } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { Await, Task, confirmationStore, tasksStore, toastStore } from "@app/stores";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { HiOutlinePencilSquare } from "solid-icons/hi";

export type TasksListProps = {
  tasks: Task[];
  title: string;
}

export function TaskList(props: TasksListProps) {
  const dateProcessor = useDateProcessor();
  const navigate = useNavigate();

  const deleteTask = async (id: number) => {
    await tasksStore.deleteByOriginalId(id);
    toastStore.pushToast("success", t("ConfirmationRequest.taskDeletion.success"));
  }

  const requestDeletion = (task: Task) => {
    confirmationStore.requestConfirmation({
      onConfirm: () => deleteTask(task.id),
      text: t("ConfirmationRequest.taskDeletion.text.complete", undefined, { title: task.title }),
      confirmButton: { label: t("ConfirmationRequest.taskDeletion.confirm")}
    });
  }

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
                      controls={[
                        {
                          label: t("Edit", "Actions"),
                          icon: HiOutlinePencilSquare,
                          variant: "primary",
                          onClick: () => navigate(`/edit-task/${task.id}`)
                        },
                        {
                          label: t("Delete", "Actions"),
                          icon: IoTrash,
                          variant: "danger",
                          onClick: () => requestDeletion(task)
                        },
                      ]}
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

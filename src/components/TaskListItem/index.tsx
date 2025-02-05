import { Task, TaskStatus } from "@app/entities";
import { useTasks } from "@app/hooks";
import { Message, t } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import { useNavigate } from "@solidjs/router";
import { confirmationStore, toastStore } from "@app/stores";
import { JSX, Match, Show, Switch, createMemo } from "solid-js";
import { FaRegularCircleDot, FaSolidCalendarCheck, FaSolidCalendarXmark } from "solid-icons/fa";
import { HiOutlinePencilSquare } from "solid-icons/hi";
import { IoCheckmark, IoClose, IoTrash } from "solid-icons/io";

import { Button, ButtonProps } from "../Button";
import "./style.css";

export function TaskListItem(props: Task) {
  const dateProcessor = useDateProcessor();
  const navigate = useNavigate();
  const { toggleDone, deleteTask } = useTasks();
  const taskStatus = createMemo((): TaskStatus => {
    const doneWithThisWeek = dateProcessor.withinThisWeek(props.doneAt);
    if (doneWithThisWeek) {
      return "completed";
    } else if (!doneWithThisWeek && props.weekday >= dateProcessor.today.weekday) {
      return "todo";
    }

    return "missed";
  });

  const getToggleButtonProps = createMemo((): {
    variant: ButtonProps["variant"],
    nextValue: boolean,
    icon: JSX.Element
  } => {
    if (taskStatus() === "completed") {
      return {
        variant: "secondary",
        nextValue: false,
        icon: <FaSolidCalendarXmark size={20} />
      };
    }

    return {
      variant: "success",
      nextValue: true,
      icon: <FaSolidCalendarCheck size={20} />
    };
  });

  const handleTaskDelete = async (id: Task['id']) => {
    await deleteTask(id);
    toastStore.pushToast("success", t("ConfirmationRequest.taskDeletion.success"));
  }

  const requestDeletion = (task: Task) => {
    confirmationStore.requestConfirmation({
      onConfirm: () => handleTaskDelete(task.id),
      text: t("ConfirmationRequest.taskDeletion.text.partial", undefined, { title: task.title }),
      confirmButton: { label: t("ConfirmationRequest.taskDeletion.confirm")}
    });
  }

  return (
    <div class={`task-item ${taskStatus()}`}>
      <div class="task-item-status">
        <Switch fallback={<FaRegularCircleDot size={24} />}>
          <Match when={taskStatus() === "completed"}>
            <IoCheckmark />
          </Match>
          <Match when={taskStatus() === "missed"}>
            <IoClose />
          </Match>
        </Switch>
      </div>
      <div class="task-item-main">
        <div class="font-md text-ellipsis overflow-hidden whitespace-nowrap" classList={{ "line-through text-muted": taskStatus() === "completed" }}>
          {props.title}
        </div>
      </div>
      <div class="text-right pr-2">
        <div class="text-lg font-semibold">
          {props.time}
        </div>
        <Show when={["completed", "missed"].includes(taskStatus())}>
          <div class="text-xs task-item-status-text">
            <Message>{`common.task.${taskStatus()}`}</Message>
          </div>
        </Show>
      </div>
      <div class="task-item-controls">
        <Button
          variant={getToggleButtonProps().variant}
          class="rounded-none h-12 w-12"
          onClick={() => toggleDone(props, getToggleButtonProps().nextValue)}
        >
          {getToggleButtonProps().icon}
        </Button>
        <Button
          variant="primary"
          class="rounded-none h-12 w-12"
          onClick={() => navigate(`/edit-task/${props.id}`)}
        >
          <HiOutlinePencilSquare size={20} />
        </Button>
        <Button
          variant="danger"
          class="rounded-none h-12 w-12"
          onClick={() => requestDeletion(props)}
        >
          <IoTrash size={20} />
        </Button>
      </div>
    </div>
  );
}

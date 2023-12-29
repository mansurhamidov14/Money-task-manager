import { createMemo, createRoot, createSignal } from "solid-js";
import { taskService } from "@app/services";
import { Task } from "./types";
import { AsyncStore } from "../types";
import { TaskFormSchema } from "@app/schemas";

export function initTasksStore() {
  const [tasks, setTasks] = createSignal<AsyncStore<Task[]>>({ status: "loading" });

  const fetchUserTasks = async (user: number) => {
    try {
      const data = await taskService.getUserTasks(user);
      setTasks({ status: "success", data });
    } catch (e: any) {
      setTasks({ status: "error", error: e.message });
    } 
  }

  const addTask = async (user: number, task: TaskFormSchema) => {
    await taskService.create(user, task);
    putIntoLoadingState();
  }

  const putIntoLoadingState = () => {
    setTasks({ status: "loading" });
  }

  const todayTasks = createMemo(() => {
    const today = new Date();
    const weekday = today.getWeekDay();
    const date = today.toDatePickerString();

    if (tasks().status === "loading") {
      return [];
    }

    return tasks().data!.filter(task => (
      task.weekday === weekday &&
      task.startDate <= date &&
      (!task.endDate || task.endDate >= date
    )));
  });

  return { tasks, addTask, todayTasks, fetchUserTasks, putIntoLoadingState };
}

export const tasksStore = createRoot(initTasksStore);

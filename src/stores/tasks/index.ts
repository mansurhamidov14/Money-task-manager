import { createMemo, createRoot, createSignal } from "solid-js";
import { taskService } from "@app/services";
import { Task } from "./types";
import { AsyncStore } from "../types";
import { TaskFormSchema } from "@app/schemas";
import { toastStore } from "..";

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

  const tasksByWeekDay = createMemo(() => {
    if (tasks().status === "success" && tasks().data?.length) {
      const date = new Date().toDatePickerString();
      return tasks().data!
        .filter(task => task.startDate <= date && (!task.endDate || task.endDate >= date))
        .groupBy(({ weekday }) => weekday);
    }

    return {};
  });

  const updateTask = (id: number, updateData: Partial<Task>) => {
    setTasks(prevValue => ({
      ...prevValue,
      data: prevValue.data?.map(task => {
        if (id !== task.id) {
          return task;
        }
        return { ...task, ...updateData };
      })
    }));
  }

  const deleteTask = async (id: number) => {
    await taskService.delete(id);
    setTasks(prevValue => ({
      ...prevValue,
      data: prevValue.data?.filter(task => task.id !== id)
    }));
  }

  const toggleDone = async (task: Task, done: boolean) => {
    const doneAt = done ? Date.now() : 0;
    let prevDoneAt = task.doneAt;
    updateTask(task.id, { doneAt });
    try {
      taskService.update(task.id, { doneAt });
    } catch (e: any) {
      if (e.message) {
        updateTask(task.id, { doneAt: prevDoneAt });
        toastStore.pushToast("error", e.message);
      }
    }
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
    ))).toSorted((a, b) => {
      return a.startTime < b.startTime ? -1 : 1
    });
  });

  return {
    tasks,
    addTask,
    tasksByWeekDay,
    deleteTask,
    todayTasks,
    fetchUserTasks,
    toggleDone,
    putIntoLoadingState
  };
}

export const tasksStore = createRoot(initTasksStore);

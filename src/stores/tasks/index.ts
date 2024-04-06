import { createMemo, createRoot, createSignal } from "solid-js";
import { Task } from "@app/entities";
import { ascSorter, descSorter, groupBy } from "@app/helpers";
import { TaskFormSchema } from "@app/schemas";
import { taskService } from "@app/services";
import { dateProcessor } from "@app/providers";
import { withUniqueFilter } from "./helpers";
import { toastStore } from "..";
import { AsyncStore } from "../types";

export function initTasksStore() {
  const [tasks, setTasks] = createSignal<AsyncStore<Task[]>>({ status: "loading" });

  const fetchUserTasks = async (user: string) => {
    try {
      const data = await taskService.getUserTasks(user);
      setTasks({ status: "success", data });
    } catch (e: any) {
      setTasks({ status: "error", error: e.message });
    } 
  }

  const addTask = async (user: string, task: TaskFormSchema) => {
    await taskService.create(user, task);
    putIntoLoadingState();
  }

  const tasksByWeekDay = createMemo(() => {
    if (tasks().status === "success" && tasks().data?.length) {
      const weekdays = groupBy(
        Array
          .range(1, 7)
          .map(weekday => ({
            day: weekday,
            date: dateProcessor.dateFromWeekDay(weekday).toDatePickerString()
          })),
        ({ day}) => day
      );
      return groupBy(
        tasks().data!
          .filter(task => {
            const taskAccomplishDate = weekdays[task.weekday][0].date;
            return task.startDate <= taskAccomplishDate && (!task.endDate || task.endDate >= taskAccomplishDate)
          })
        .toSorted(ascSorter("time")),
        ({ weekday }) => weekday
      );
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

  const deleteByOriginalId = async (id: number) => {
    await taskService.deleteByOriginaId(id);
    setTasks(prevValue => ({
      ...prevValue,
      data: prevValue.data?.filter(task => task.id !== id && task.originalId !== id)
    }));
  }

  const toggleDone = async (task: Task, done: boolean) => {
    const doneAt = done ? Date.now() : 0;
    let prevDoneAt = task.doneAt;
    updateTask(task.id, { doneAt });
    try {
      await taskService.update(task.id, { doneAt });
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
    const weekday = new Date().getWeekDay();

    if (tasks().status === "loading") {
      return [];
    }

    return tasksByWeekDay()[weekday] ?? [];
  });

  const filterTasks = (filterFn: (task: Task) => any) => {
    if (tasks().status !== "success") {
      return [];
    }

    return tasks().data!.filter(filterFn);
  }

  const futureTasks = createMemo(() => (
    filterTasks(
      withUniqueFilter(
        task => task.startDate > new Date().toDatePickerString()
      )
    ).toSorted(ascSorter("startDate"))
  ));

  const archiveTasks = createMemo(() => (
    filterTasks(
      withUniqueFilter(
        task => task.endDate && task.endDate < new Date().toDatePickerString()
      )
    ).toSorted(descSorter("startDate"))
  ));

  return {
    tasks,
    addTask,
    tasksByWeekDay,
    archiveTasks,
    futureTasks,
    deleteTask,
    todayTasks,
    fetchUserTasks,
    toggleDone,
    putIntoLoadingState,
    deleteByOriginalId
  };
}

export const tasksStore = createRoot(initTasksStore);

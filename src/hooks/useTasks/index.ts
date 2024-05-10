import { Task } from "@app/entities";
import { ascSorter, descSorter, groupBy } from "@app/helpers";
import { DataContext, dateProcessor } from "@app/providers";
import { TaskFormSchema } from "@app/schemas";
import { taskService } from "@app/services";
import { toastStore } from "@app/stores";
import { createMemo, useContext } from "solid-js";
import { withUniqueFilter } from "./helpers";

export function useTasks() {
  const context = useContext(DataContext);

  if (!context) {
    console.error('`useTasks` hook can not be called outside of `<DataProvider />`');
    throw new Error('`useTasks` hook can not be called outside of `<DataProvider />`');
  }

  const { tasks, setTasks, reloadTasks, waitForTasksUpdate } = context;

  const updateTaskItem = (id: Task['id'], updateData: Partial<Task>) => {
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

  const todayTasks = createMemo(() => {
    return tasksByWeekDay()[new Date().getWeekDay()] ?? [];
  });

  const addTask = async (formData: TaskFormSchema) => {
    await taskService.create(formData);
    reloadTasks();
  }

  const updateTask = async (id: Task['id'], formData: TaskFormSchema) => {
    await taskService.update(id, formData);
    reloadTasks();
  }

  const toggleDone = async (task: Task, done: boolean) => {
    const doneAt = done ? Date.now() : 0;
    let prevDoneAt = task.doneAt;
    updateTaskItem(task.id, { doneAt: new Date(doneAt).toISOString() });
    try {
      await taskService.toggleDone(task.id, doneAt);
    } catch (e: any) {
      if (e.message) {
        updateTaskItem(task.id, { doneAt: prevDoneAt });
        toastStore.pushToast("error", e.message);
      }
    }
  }

  const deleteTask = async (id: Task['id'], hard?: boolean) => {
    const currentState = tasks();
  
    setTasks((state) => ({
      status: state.status,
      data: state.data?.filter(
        data => data.id !== id && (!hard || data.originalId !== id)
      )
    }));
  
    try {
      await taskService.delete(id, hard);
    } catch (e: any) {
      console.error(e);
      toastStore.handleServerError(e);
      setTasks({ status: currentState.status, data: currentState.data });
    }
  }

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
    updateTask,
    deleteTask,
    toggleDone,
    waitForTasksUpdate,
    futureTasks,
    archiveTasks,
    tasksByWeekDay,
    todayTasks
  };
}
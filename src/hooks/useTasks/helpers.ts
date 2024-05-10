import { Task } from "@app/entities";

export const withUniqueFilter = (filterFn: (task: Task) => any) => {
  return (task: Task) =>  {
    return filterFn(task) && (!task.originalId || task.originalId === task.id);
  };
};

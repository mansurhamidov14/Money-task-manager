import { type IDBCollection, SearchCondition } from "@app/adapters/IDB";
import { TaskFormSchema } from "@app/schemas";
import { NewTask } from "./types";
import {
  OneTimeTask,
  RecurringTask,
  RecurringTaskDay,
  Task,
  User,
} from "@app/entities";

export class TaskService {
  constructor (private collection: IDBCollection<Task>) { }

  async create(user: User["id"], task: TaskFormSchema): Promise<void> {
    const isRecurring = Number(task.isRecurring);

    if (isRecurring) {
      const records: NewTask[] = task.days!.map((day) => ({
        user,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
        weekday: day.day!,
        time: day.time!,
        isRecurring: 1,
        doneAt: day.doneAt || 0
      }));

      const originalTask = await this.collection.create(records[0]);
      if (records[1]) {
        return records.slice(1)
          .reduce((promise, record) => {
            return promise.then(() => {
              return this.collection.create({ ...record, originalId: originalTask.id });
            });
          }, Promise.resolve() as Promise<any>);
      }

      return;
    }

    await this.collection.create<NewTask>({
      user,
      title: task.title,
      isRecurring: 0,
      startDate: task.startDate,
      endDate: task.startDate,
      weekday: new Date(task.startDate).getWeekDay(),
      time: task.time!,
      doneAt: 0
    });
    return;
  }

  async getById(id: number): Promise<RecurringTask | OneTimeTask | null> {
    const task = await this.collection.queryOne(id);
    if (task && task.isRecurring) {
      let originalTask: Task | null;
      if (task.originalId && task.originalId !== task.id) {
        originalTask = await this.collection.queryOne(task.originalId);
        if (!originalTask) {
          throw new Error("Task item is broken");
        }
      } else {
        originalTask = task;
      }
      const relatedTasks = await this.collection.queryAll({ originalId: task.originalId || task.id });
      const taskDays: RecurringTaskDay[] = relatedTasks
        .reduce((acc, value) => {
          return [...acc, {
            day: value.weekday,
            time: value.time,
            doneAt: value.doneAt
          }]
        }, [{
          day: originalTask.weekday,
          time: originalTask.time,
          doneAt: originalTask.doneAt
        }])
        .toSorted((a, b) => a.day < b.day ? -1 : 1);


      return {
        id: originalTask.id,
        user: task.user,
        title: task.title,
        isRecurring: 1,
        startDate: task.startDate,
        endDate: task.endDate,
        days: taskDays
      };
    } else if (task) {
      return {
        id: task.id,
        title: task.title,
        user: task.user,
        isRecurring: 0,
        date: task.startDate,
        time: task.time,
      };
    }

    return null;
  }

  getUserTasks(user: User["id"]) {
    return this.collection.queryAll({ user });
  }

  update(id: SearchCondition<Task>, data: Partial<Task>) {
    return this.collection.update(id, data);
  }

  async delete(id: number) {
    /** Deleting particular task by given id */
    await this.collection.delete(id);
    /** Looking for task linked to deleted task with originalId field */
    const linkedTasks = await this.collection.queryAll({ originalId: id });
    const tasksCount = linkedTasks.length;
    if (tasksCount) {
      const firstTaskId = linkedTasks[0].id;
      await this.collection.update(firstTaskId, { originalId: undefined });
      if (tasksCount > 1) {
        await this.collection.update({ originalId: id }, { originalId: firstTaskId });
      }
    }
  }

  async deleteByOriginaId(originalId: number) {
    await this.collection.delete(originalId);
    return this.collection.delete({ originalId });
  }
}

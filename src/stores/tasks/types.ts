export type Task = {
  id: number;
  originalId?: number;
  user: string;
  title: string;
  isRecurring: 1 | 0;
  startDate: string;
  endDate?: string;
  time: string;
  weekday: number;
  doneAt: number;
  createdAt: number;
  updatedAt: number;
}

type TaskBase = {
  id: number;
  originalId?: number;
  title: string;
  user: string;
}

export type RecurringTask = TaskBase & {
  isRecurring: 1;
  startDate: string;
  endDate?: string;
  days?: RecurringTaskDay[];
}

export type OneTimeTask = TaskBase & {
  isRecurring: 0;
  date: string;
  time: string;
}

export type RecurringTaskDay = {
  day: number;
  time: string;
  doneAt: number;
}

export type TaskStatus = "completed" | "todo" | "missed";

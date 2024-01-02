export type Task = {
  id: number;
  originalId?: number;
  user: number;
  title: string;
  isRecurring: 1 | 0;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  weekday: number;
  doneAt: number;
  createdAt: number;
  updatedAt: number;
}

type TaskBase = {
  id: number;
  title: string;
  user: number;
}

export type RecurringTask = TaskBase & {
  isRecurring: 1;
  startDate: string;
  endDate: string;
  days: RecurringTaskDay[];
}

export type OneTimeTask = TaskBase & {
  isRecurring: 0;
  date: string;
  startTime: string;
  endTime: string;
}

export type RecurringTaskDay = {
  day: number;
  startTime: string;
  endTime: string;
}

export type TaskStatus = "completed" | "todo" | "missed";


type TaskBase = {
  id: number;
  originalId?: number;
  title: string;
  userId: string;
}

export type Task = TaskBase & {
  isRecurring: boolean;
  startDate: string;
  endDate?: string;
  time: string;
  weekday: number;
  doneAt: string;
  createdAt: string;
  updatedAt: string;
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

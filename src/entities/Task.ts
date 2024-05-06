import { User } from "./User";

export type Task = {
  id: string;
  originalId?: string;
  userId: User["id"];
  title: string;
  isRecurring: boolean;
  startDate: string;
  endDate?: string;
  time: string;
  weekday: number;
  doneAt: string;
  createdAt: string;
  updatedAt: string;
}

type TaskBase = {
  id: string;
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

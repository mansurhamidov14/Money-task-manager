import { type DateProcessor } from "@app/helpers";
import { Task } from "@app/stores";

export function getTaskStatus(task: Task, dateFomatter: DateProcessor): "missed" | "todo" | "completed" {
  if (task.doneAt > dateFomatter.today.timestamp) {
    return "completed";
  }

  return "missed";
}
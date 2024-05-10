import { useTasks } from "@app/hooks";
import { t } from "@app/i18n";
import { TaskList } from "./components";

export const TasksArchiveScreen = () => {
  const { archiveTasks } = useTasks();
  return <TaskList title={t("TasksScreen.archive")} tasks={archiveTasks()} />;
}

export const FutureTasksScreen = () => {
  const { futureTasks } = useTasks();
  return <TaskList title={t("TasksScreen.futureTasks")} tasks={futureTasks()} />;
}

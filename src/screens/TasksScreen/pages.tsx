import { tasksStore } from "@app/stores"
import { TaskList } from "./components"
import { t } from "@app/i18n"

export const TasksArchiveScreen = () => {
  return <TaskList title={t("TasksScreen.archive")} tasks={tasksStore.archiveTasks()} />;
}

export const FutureTasksScreen = () => {
  return <TaskList title={t("TasksScreen.futureTasks")} tasks={tasksStore.futureTasks()} />;
}

import { useParams, useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { ScreenHeader, VerticalScroll } from "@app/components";
import { OneTimeTask, RecurringTask } from "@app/entities";
import { t } from "@app/i18n";
import { taskService } from "@app/services";
import { Await, toastStore } from "@app/stores";
import { Form } from "../components/TaskForm/Form";

export function EditTaskScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const [editedTask, setEditedTask] = createSignal<RecurringTask | OneTimeTask | null>(null);

  onMount(async () => {
    try {
      const { data: task} = await taskService.getById(params.id); 
      setEditedTask(task);
    } catch (e: any) {
      toastStore.handleServerError(e);
      navigate("/home");
    }
  });
  
  return (
    <main>
      <ScreenHeader withGoBackButton title={t("EditTaskScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <Await for={[editedTask()]}>
          <Form task={editedTask()!} />
        </Await>
      </VerticalScroll>
    </main>
  );
}

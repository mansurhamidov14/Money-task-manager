import { useParams, useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { ScreenHeader, VerticalScroll } from "@app/components";
import { OneTimeTask, RecurringTask } from "@app/entities";
import { t } from "@app/i18n";
import { taskService } from "@app/services";
import { Await } from "@app/stores";
import { Form } from "../components/TaskForm/Form";

export function EditTaskScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const [editedTask, setEditedTask] = createSignal<RecurringTask | OneTimeTask | null>(null);

  onMount(async () => {
    const task = await taskService.getById(Number(params.id));
    if (!task) {
      navigate("/home");
    }

    setEditedTask(task);
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

import { Button } from "@app/components";
import { OneTimeTask, RecurringTask } from "@app/entities";
import { useTasks } from "@app/hooks";
import { Action, Message, t } from "@app/i18n";
import { getTaskFormSchema } from "@app/schemas";
import { toastStore } from "@app/stores";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { FaRegularCalendarMinus, FaRegularCalendarPlus } from "solid-icons/fa";
import { For, Show, createSignal, onMount } from "solid-js";

import {
  DateInput,
  DaySelect,
  RecurringCheckbox,
  TimeInput,
} from ".";
import { TitleInput } from "../shared";

export type Props = {
  task?: RecurringTask | OneTimeTask;
}

export function Form({ task }: Props) {
  const screenTranslationPrefix = task ? "EditTaskScreen" : "NewTaskScreen";
  const { addTask, updateTask } = useTasks();
  const [submitLoading, setSubmitLoading] = createSignal(false);
  const formHandler = useFormHandler(yupSchema(getTaskFormSchema()), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setSubmitLoading(true);
    const filledDays = formHandler.formData().days;
    if (formHandler.formData().isRecurring === "0") {
      formHandler.formData().days?.forEach(() => {
        formHandler.removeFieldset(0, "days");
      });
    }
    
    try {
      await formHandler.validateForm();
      if (task) {
        await updateTask(task.id, formHandler.formData())
      } else {
        await addTask(formHandler.formData());
      }

      toastStore.pushToast("success", t(`${screenTranslationPrefix}.success`));
      history.back();
    } catch (e: any) {
      formHandler.fillForm({
        ...formHandler.formData(),
        days: filledDays
      });
      setSubmitLoading(false);
      if (e.message) {
        toastStore.pushToast("error", t(`${screenTranslationPrefix}.error`, undefined, { error: e.message }));
      }
    }
  }

  onMount(() => {
    if (task) {
      formHandler.fillForm({
        title: task.title,
        startDate: task.isRecurring ? task.startDate : task.date,
        endDate: task.isRecurring ? task.endDate : task.date,
        time: task.isRecurring ? undefined : task.time,
        isRecurring: task.isRecurring.toString() as "0" | "1",
        days: task.isRecurring ? task.days : [{ doneAt: 0, time: '', day: 1 }]
      })
    }
  });

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <TitleInput formHandler={formHandler} />
      <div class="flex flex-wrap gap-3">
        <div class="w-full mb-3">
          <RecurringCheckbox formHandler={formHandler} />
        </div>
        <div class="flex-1">
          <DateInput
            name="startDate"
            label={t(`TaskFormFields.${
              formHandler.getFieldValue("isRecurring") === "0"
                ? "date"
                : "startDate"
            }`)}
            formHandler={formHandler}
          />
        </div>
        <div class="flex-1">
          <Show
            when={formHandler.getFieldValue("isRecurring") === "1"}
            fallback={<TimeInput formHandler={formHandler} name="time" label={t("TaskFormFields.time")} />}
          >
            <DateInput
              name="endDate"
              label={t("TaskFormFields.endDate")}
              formHandler={formHandler}
            />
          </Show>
        </div>
      </div>
      <Show when={formHandler.formData().isRecurring === "1"}>
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold text-lg">
            <Message>TaskFormFields.selectDays</Message>
          </h3>
          <For each={formHandler.formData().days}>
            {(_, i) => (
              <div class="flex gap-3">
                <div class="flex-1">
                  <DaySelect formHandler={formHandler} name={`days.${i()}.day`} />
                </div>
                <div class="flex-1">
                  <TimeInput formHandler={formHandler} name={`days.${i()}.time`} label={t("TaskFormFields.time")} />
                </div>
                <Show when={i()}>
                  <Button class="w-10 h-14 text-red-600 dark:text-red-400" variant="transparent" onClick={() => formHandler.removeFieldset(i(), "days")}>
                    <FaRegularCalendarMinus size={18} />
                  </Button>
                </Show>
              </div>
            )}
          </For>
          <Button
            class="gap-1"
            type="button"
            variant="success"
            onClick={() => formHandler.addFieldset({ basePath: "days" })}
          >
            <FaRegularCalendarPlus />
            <Message>TaskFormFields.addWeekday</Message>
          </Button>
        </div>
      </Show>
      <Button type="submit" variant="primary" size="lg" loading={submitLoading()}>
        <Action>{task ? 'Edit' : 'Add'}</Action>
      </Button>
    </form>
  );
}

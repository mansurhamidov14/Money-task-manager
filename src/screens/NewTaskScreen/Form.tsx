import { For, Show } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { FaRegularCalendarMinus, FaRegularCalendarPlus } from "solid-icons/fa";

import { Button } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { getTaskFormSchema } from "@app/schemas";
import { tasksStore, toastStore, user } from "@app/stores";

import {
  DateInput,
  RecurringCheckbox,
  TitleInput,
  TimeInput,
  DaySelect,
} from "../components/TaskForm";

export function Form() {
  const formHandler = useFormHandler(yupSchema(getTaskFormSchema()), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      await tasksStore.addTask(user.currentUser().data!.id, formHandler.formData());
      toastStore.pushToast("success", t("NewTaskScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("success", t("NewTaskScreen.success", undefined, { error: e.message }));
    }
  }

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <TitleInput formHandler={formHandler} />
      <div class="flex flex-wrap">
        <div class="w-full mb-3">
          <RecurringCheckbox formHandler={formHandler} />
        </div>
        <div class="w-1/2 pr-2">
          <DateInput
            name="startDate"
            label={t(`NewTaskScreen.FormFields.${
              formHandler.getFieldValue("isRecurring") === "0"
                ? "date"
                : "startDate"
            }`)}
            formHandler={formHandler}
          />
        </div>
        <div class="w-1/2 pl-2">
          <Show
            when={formHandler.getFieldValue("isRecurring") === "1"}
            fallback={<TimeInput formHandler={formHandler} name="time" />}
          >
            <DateInput
              name="endDate"
              label={t("NewTaskScreen.FormFields.endDate")}
              formHandler={formHandler}
            />
          </Show>
        </div>
      </div>
      <Show when={formHandler.formData().isRecurring === "1"}>
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold text-lg">
            <Message>NewTaskScreen.FormFields.selectDays</Message>
          </h3>
          <For each={formHandler.formData().days}>
            {(_, i) => (
              <div class="flex gap-3">
                <div class="w-1/2">
                  <DaySelect formHandler={formHandler} name={`days.${i()}.day`} />
                </div>
                <div class="flex-1">
                  <TimeInput formHandler={formHandler} name={`days.${i()}.time`} />
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
            <Message>NewTaskScreen.FormFields.addWeekday</Message>
          </Button>
        </div>
      </Show>
      <Button type="submit" variant="primary" size="lg">
        <Action>Add</Action>
      </Button>
    </form>
  );
}

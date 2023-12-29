import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { getTaskFormSchema } from "@app/schemas";

import {
  DateInput,
  RecurringCheckbox,
  TitleInput,
  TimeInput,
  DaySelect,
} from "../components/TaskForm";
import { For, Show } from "solid-js";
import { FaRegularCalendarMinus, FaRegularCalendarPlus } from "solid-icons/fa";

export function Form() {
  const formHandler = useFormHandler(yupSchema(getTaskFormSchema()), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {} catch (e: any) {}
  }

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <div>
        <TitleInput formHandler={formHandler} />
        <div class="py-2" />
        <RecurringCheckbox formHandler={formHandler} />
      </div>
      <div class="flex gap-3">
        <div class="w-1/2">
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
        <div class="w-1/2">
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
          <h3 class="font-medium text-lg">Select days</h3>
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

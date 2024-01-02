import { t } from "@app/i18n";
import { RecurringTaskDay } from "@app/stores";
import { array, mixed, number, object, string } from "yup";

export type TaskFormSchema = {
  title: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  isRecurring: "1" | "0";
  days?: RecurringTaskDay[];
}

export function getTaskFormSchema(defaults: Partial<TaskFormSchema> = {}) {
  return object({
    title: string()
      .required(t("common.FormFields.required"))
      .default(defaults.title),
    isRecurring: mixed<"1" | "0">()
      .oneOf(["1", "0"])
      .default(defaults.isRecurring ?? "0"),
    startDate: string()
      .required(t("common.FormFields.required"))
      .default(defaults.startDate),
    endDate: string().optional().default(defaults.endDate),
    startTime: string().when("isRecurring", {
        is: "0",
        then: schema => schema.required(t("common.FormFields.required")),
        otherwise: schema => schema.optional()
      }),
    endTime: string().when("isRecurring", {
        is: "0",
        then: schema => schema.required(t("common.FormFields.required")),
        otherwise: schema => schema.optional()
      }),
    days: array(
      object({
        day: number()
          .min(1, t("common.FormFields.required"))
          .max(7, t("common.FormFields.required"))
          .required(t("common.FormFields.required"))
          .default(1),
        startTime: string().required(t("common.FormFields.required")),
        endTime: string().required(t("common.FormFields.required")),
      })
    ).when("isRecurring", {
      is: "1",
      then: schema => schema.optional()
    })
  });
}
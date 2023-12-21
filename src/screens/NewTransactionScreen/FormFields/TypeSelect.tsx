import { Select } from "@app/components";
import { t } from "@app/i18n";
import { createMemo } from "solid-js";
import { InputProps } from "./types";
import { Field } from "solid-form-handler";
import { FaSolidArrowTrendDown, FaSolidArrowTrendUp } from "solid-icons/fa";

export function TypeSelect(props: InputProps) {
  const getIcon = createMemo(() => {
    const value = props.formHandler.getFieldValue("type");
    if (value === "expense") {
      return <FaSolidArrowTrendDown />
    }

    if (value === "income") {
      return <FaSolidArrowTrendUp />
    }

    return undefined;
  });

  return (
    <Field
      mode="input"
      name="type"
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id="type"
          label={t("NewTransactionScreen.FormFields.type")}
          addonStart={getIcon()}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        >
          <option value="expense">{t("common.expense")}</option>
          <option value="income">{t("common.income")}</option>
        </Select>
      )}
    />
  );
}

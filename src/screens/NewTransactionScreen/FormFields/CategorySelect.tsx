import { Select } from "@app/components";
import { Categories } from "@app/constants";
import { Message, t } from "@app/i18n";
import { For, createMemo } from "solid-js";
import { InputProps } from "./types";
import { Field } from "solid-form-handler";

export function CategorySelect(props: InputProps) {
  const getIcon = createMemo(() => {
    // @ts-ignore
    const category = Categories[props.formHandler.getFieldValue("category")];
    if (category) {
      const Icon = category.icon;
      return <Icon />
    }

    return undefined
  });

  return (
    <Field
      mode="input"
      name="category"
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id="category"
          label={t("NewTransactionScreen.FormFields.category")}
          addonStart={getIcon()}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        >
          <For each={Object.values(Categories)}>
            {category => (
              <option value={category.id}>
                <Message>{`Category.${category.id}`}</Message>
              </option>
            )}
          </For>
        </Select>
      )}
    />
  );
}

import { For, createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { Select } from "@app/components";
import { Message, t } from "@app/i18n";
import { InputProps } from "../shared";
import { categoryService } from "@app/services";

export function CategorySelect(props: InputProps) {
  const getIcon = createMemo(() => {
    const value = props.formHandler.getFieldValue("category");

    if (value) {
      const Icon = categoryService.getIcon(value);
      return <Icon />;
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
          <For each={categoryService.categories}>
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

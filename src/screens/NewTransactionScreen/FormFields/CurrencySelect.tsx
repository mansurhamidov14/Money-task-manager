import { Select } from "@app/components";
import { CurrencyCode, currencies } from "@app/constants";
import { t } from "@app/i18n";
import { Field } from "solid-form-handler";
import { For } from "solid-js";
import { InputProps } from "./types";

export function CurrencySelect(props: InputProps) {
  return (
    <Field
      mode="input"
      name="currency"
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id="currency"
          label={t("NewTransactionScreen.FormFields.currency")}
          addonStart={(
            <img
              src={currencies[props.formHandler.getFieldValue("currency") as CurrencyCode]?.flag}
              class="w-full"
            />
          )}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        >
          <For each={Object.values(currencies)}>
            {currency => (
              <option value={currency.code}>
                {currency.code}
              </option>
            )}
          </For>
        </Select>
      )}
    />
  );
}

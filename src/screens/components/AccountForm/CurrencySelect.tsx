import { Field } from "solid-form-handler";
import { For, Show } from "solid-js";
import { Select } from "@app/components";
import { t } from "@app/i18n";
import { currencyService } from "@app/services";
import { InputProps } from "../shared";

export function CurrencySelect(props: InputProps) {
  return (
    <Field
      mode="input"
      name="currency"
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id="currency"
          label={t("NewAccountScreen.FormFields.currency")}
          addonStart={(
            <Show when={field.props.value}>
              <img src={currencyService.getFlag(field.props.value)} class="w-full" />
            </Show>
          )}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        >
          <For each={currencyService.avaliableCurrencies}>
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

import { For, Show, createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { Select } from "@app/components";
import { t } from "@app/i18n";
import { accountsStore } from "@app/stores";
import { InputProps } from "./types";
import { currenciecService } from "@app/services";

export function AccountSelect(props: InputProps) {
  const selectedAccountFlag = createMemo(() => {
    const selectedAccount = accountsStore
      .accounts()
      .data
      ?.find(account => account.id === props.formHandler.getFieldValue("account"));
    
    if (!selectedAccount) return;

    return currenciecService.getFlag(selectedAccount.currency);
  });

  return (
    <Field
      mode="input"
      name="account"
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id="account"
          label={t("NewTransactionScreen.FormFields.account")}
          addonStart={(
            <Show when={selectedAccountFlag()}>
              <img src={selectedAccountFlag()} class="w-full" />
            </Show>
          )}
          errorMessage={field.helpers.errorMessage}
          {...field.props}
        >
          <For each={accountsStore.accounts().data!}>
            {account => (
              <option value={account.id}>
                {account.title}{" "}({account.currency})
              </option>
            )}
          </For>
        </Select>
      )}
    />
  );
}

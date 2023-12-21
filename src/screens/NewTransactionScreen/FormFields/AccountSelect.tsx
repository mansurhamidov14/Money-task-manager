import { Select } from "@app/components";
import { currencies } from "@app/constants";
import { t } from "@app/i18n";
import { Field } from "solid-form-handler";
import { For, createMemo } from "solid-js";
import { InputProps } from "./types";
import { accountsStore } from "@app/stores";

export function AccountSelect(props: InputProps) {
  const selectedAccountFlag = createMemo(() => {
    const selectedAccount = accountsStore
      .accounts()
      .data
      ?.find(account => account.id === props.formHandler.getFieldValue("account"));
    
    if (!selectedAccount) return;

    return currencies[selectedAccount.currency].flag;
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
          addonStart={selectedAccountFlag() && (
            <img src={selectedAccountFlag()} class="w-full" />
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

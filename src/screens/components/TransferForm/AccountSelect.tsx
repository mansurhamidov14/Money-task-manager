import { For, Show, createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { Select } from "@app/components";
import { t } from "@app/i18n";
import { accountsStore } from "@app/stores";
import { currenciecService } from "@app/services";
import { InputProps } from "../shared";

type Props = InputProps & {
  name: string;
}

export function AccountSelect(props: Props) {
  const selectedAccountFlag = createMemo(() => {
    const selectedAccount = accountsStore
      .accounts()
      .data
      ?.find(account => account.id === props.formHandler.getFieldValue(props.name));
    
    if (!selectedAccount) return;

    return currenciecService.getFlag(selectedAccount.currency);
  });

  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      render={(field) => (
        <Select
          id={props.name}
          label={t(`TransferBetweenAccountsScreen.FormFields.${props.name}`)}
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

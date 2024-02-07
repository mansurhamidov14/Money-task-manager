import { createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { currenciecService } from "@app/services";
import { accountsStore } from "@app/stores";
import { InputProps } from "../shared";

export type Props = InputProps & {
  linkedAccountField: string;
  name: string;
}

export function AmountInput(props: Props) {
  const selectedAccountCurrency = createMemo(() => {
    const selectedAccount = accountsStore
      .accounts()
      .data!
      .find(account => account.id === props.formHandler.getFieldValue(props.linkedAccountField));
    
    return selectedAccount && currenciecService.getSign(selectedAccount.currency);
  });
  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
          id={props.name}
          label={t(`TransferBetweenAccountsScreen.FormFields.${props.name}`)}
          placeholder="0.00"
          inputMode="numeric"
          errorMessage={field.helpers.errorMessage}
          addonStart={<span class="font-bold">{selectedAccountCurrency()}</span>}
          {...field.props}
        />
      )}
    />
  );
}

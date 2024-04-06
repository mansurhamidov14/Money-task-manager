import { createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { currencyService } from "@app/services";
import { InputProps } from "../shared";
import { useAccounts } from "@app/hooks";

export type Props = InputProps & {
  linkedAccountField: string;
  name: string;
}

export function AmountInput(props: Props) {
  const { accounts } = useAccounts()
  const selectedAccountCurrency = createMemo(() => {
    const selectedAccount = accounts().data!
      .find(account => account.id === props.formHandler.getFieldValue(props.linkedAccountField));
    
    return selectedAccount && currencyService.getSign(selectedAccount.currency);
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

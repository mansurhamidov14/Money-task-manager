import { createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { TextInput } from "@app/components";
import { t } from "@app/i18n";
import { currencyService } from "@app/services";
import { InputProps } from "../shared";
import { useAccounts } from "@app/hooks";

export function AmountInput(props: InputProps) {
  const { accounts } = useAccounts();
  const selectedAccountCurrency = createMemo(() => {
    const selectedAccount = accounts().data!
      .find(account => account.id === props.formHandler.getFieldValue("account"));
    
    return selectedAccount && currencyService.getSign(selectedAccount.currency);
  });
  return (
    <Field
      mode="input"
      name="amount"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInput
          id="amount"
          label={t("NewTransactionScreen.FormFields.amount.label")}
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

import { createMemo } from "solid-js";
import { Field } from "solid-form-handler";
import { TextInputWithFloatingLabel } from "@app/components";
import { t } from "@app/i18n";
import { accountsStore } from "@app/stores";
import { currencies } from "@app/constants";
import { InputProps } from "./types";

export function AmountInput(props: InputProps) {
  const selectedAccountCurrency = createMemo(() => {
    const selectedAccount = accountsStore
      .accounts()
      .data!
      .find(account => account.id === props.formHandler.getFieldValue("account"));
    
    return selectedAccount && currencies[selectedAccount.currency].sign;
  });
  return (
    <Field
      mode="input"
      name="amount"
      formHandler={props.formHandler}
      render={(field) => (
        <TextInputWithFloatingLabel
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

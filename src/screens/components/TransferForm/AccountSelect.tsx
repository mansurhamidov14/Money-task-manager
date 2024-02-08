import { Field } from "solid-form-handler";
import { AccountSlideSelect } from "@app/components";
import { t } from "@app/i18n";
import { accountsStore } from "@app/stores";
import { InputProps } from "../shared";

type Props = InputProps & {
  name: string;
}

export function AccountSelect(props: Props) {
  return (
    <Field
      mode="input"
      name={props.name}
      formHandler={props.formHandler}
      triggers={["toAccount"]}
      render={(field) => (
        <AccountSlideSelect
          id={props.name}
          label={t(`TransferBetweenAccountsScreen.FormFields.${props.name}`)}
          errorMessage={field.helpers.errorMessage}
          accounts={accountsStore.accounts().data!}
          {...field.props}
        />
      )}
    />
  );
}

import { Field } from "solid-form-handler";
import { AccountSlideSelect } from "@app/components";
import { t } from "@app/i18n";
import { InputProps } from "../shared";
import { useAccounts } from "@app/hooks";

type Props = InputProps & {
  name: string;
}

export function AccountSelect(props: Props) {
  const { accounts } = useAccounts();
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
          accounts={accounts().data!}
          {...field.props}
        />
      )}
    />
  );
}

import { Show, createSignal } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button, Loading } from "@app/components";
import { Action, t } from "@app/i18n";
import { getTransactionFormSchema } from "@app/schemas";
import { accountsStore, transactionsStore, toastStore, Transaction } from "@app/stores";

import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  DateTimeInput,
  TitleInput,
  TypeSelect
} from "../components/TransactionForm";

export function Form(props: Transaction) {
  const [loading, setLoading] = createSignal(false);
  const formHandler = useFormHandler(
    yupSchema(getTransactionFormSchema({
      title: props.title,
      type: props.type,
      amount: props.amount,
      account: props.account,
      category: props.category,
      date: new Date(props.transactionDateTime).toLocaleDateTimePickerString()
    }, accountsStore.accounts().data!)),
    { validateOn: ["blur"]}
  );

  const handleSubmit = async (event: Event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const prevData = props;
      const formData = formHandler.formData();
      const affectedAccount = accountsStore.accounts()
        .data!.find(account => account.id === formData.account)!;
      const currency = affectedAccount.currency;
      const type = formData.type;
      const amount = formData.amount;
      const transactionDateTime = new Date(formData.date).toISOString();
      const transactionDate = transactionDateTime.split("T")[0];
      const transactionData = {
        account: formData.account,
        title: formData.title,
        category: formData.category,
        type,
        currency,
        amount,
        transactionDate,
        transactionDateTime,
      };
      await transactionsStore.updateTransaction(prevData.id, transactionData);
      await accountsStore.changeBalance(prevData.account, prevData.amount * -1, prevData.type);
      await accountsStore.changeBalance(affectedAccount.id, amount, type);
      toastStore.pushToast("success", t("EditTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("error", t("EditTransactionScreen.error", undefined, { error: e.message }));
    }
  }

  return (
    <Show when={!loading()} fallback={<Loading />}>
      <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
        <TitleInput formHandler={formHandler} />
        <TypeSelect formHandler={formHandler} />
        <CategorySelect formHandler={formHandler} />
        <AccountSelect formHandler={formHandler} />
        <AmountInput formHandler={formHandler} />
        <DateTimeInput formHandler={formHandler} />
        <Button type="submit" variant="primary" size="lg">
          <Action>Save</Action>
        </Button>
      </form>
    </Show>
  );
}

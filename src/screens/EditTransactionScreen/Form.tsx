import { Show, createSignal } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button, Loading } from "@app/components";
import { Transaction } from "@app/entities";
import { useAccounts } from "@app/hooks";
import { Action, t } from "@app/i18n";
import { accountService, transactionService } from "@app/services";
import { getTransactionFormSchema } from "@app/schemas";
import { toastStore } from "@app/stores";

import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  TypeSelect
} from "../components/TransactionForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form(props: Transaction) {
  const { accounts, refetchAccounts } = useAccounts();
  const [loading, setLoading] = createSignal(false);
  const formHandler = useFormHandler(
    yupSchema(getTransactionFormSchema({
      title: props.title,
      type: props.type,
      amount: props.amount,
      account: props.account.id,
      category: props.category,
      date: new Date(props.transactionDateTime).toLocaleDateTimePickerString()
    }, accounts().data!)),
    { validateOn: ["blur"]}
  );

  const handleSubmit = async (event: Event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const prevData = props;
      const formData = formHandler.formData();
      const affectedAccount = accounts()
        .data!.find(account => account.id === formData.account)!;
      const amount = formData.amount;
      await transactionService.update(prevData.id, formData);
      const prevAccountAmountChange = prevData.type === "expense" ? prevData.amount : (prevData.amount * -1);
      const affectedAccountAmountChange = formData.type === "income" ? amount : (amount * -1);
      await accountService.changeBalance(prevData.account.id, prevAccountAmountChange);
      await accountService.changeBalance(affectedAccount.id, affectedAccountAmountChange);
      refetchAccounts();
      toastStore.pushToast("success", t("EditTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      if (e.message && e.status !== 401) {
        toastStore.pushToast("error", t("EditTransactionScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <Show when={!loading()} fallback={<Loading />}>
      <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
        <AccountSelect formHandler={formHandler} />
        <TitleInput formHandler={formHandler} />
        <TypeSelect formHandler={formHandler} />
        <CategorySelect formHandler={formHandler} />
        <AmountInput formHandler={formHandler} />
        <DateTimeInput formHandler={formHandler} />
        <Button type="submit" variant="primary" size="lg">
          <Action>Save</Action>
        </Button>
      </form>
    </Show>
  );
}

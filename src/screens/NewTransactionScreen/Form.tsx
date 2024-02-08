import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { Action, t } from "@app/i18n";
import { getTransactionFormSchema } from "@app/schemas";
import { accountsStore, transactionsStore, toastStore, user } from "@app/stores";

import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  TypeSelect
} from "../components/TransactionForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form() {
  const formHandler = useFormHandler(yupSchema(getTransactionFormSchema({
    date: new Date().toLocaleDateTimePickerString(),
    account: accountsStore.accounts().data!.find(account => account.primary)?.id,
    category: "market",
    type: "expense"
  }, accountsStore.accounts().data!)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const formData = formHandler.formData();
      const affectedAccount = accountsStore.accounts()
        .data!.find(account => account.id === formData.account)!;
      const userId = user.currentUser().data!.id;
      const currency = affectedAccount.currency;
      const type = formData.type;
      const amount = formData.amount;
      const transactionDateTime = new Date(formData.date).toISOString();
      const transactionDate = transactionDateTime.split("T")[0];
      const transactionData = {
        user: userId,
        account: formData.account,
        title: formData.title,
        category: formData.category,
        type,
        currency,
        amount,
        transactionDate,
        transactionDateTime,
      };
      await transactionsStore.addTransaction(transactionData);
      accountsStore.changeBalance(affectedAccount.id, amount, type);
      toastStore.pushToast("success", t("NewTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      if (e.message) {
        toastStore.pushToast("error", t("NewTransactionScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <AccountSelect formHandler={formHandler} />
      <TitleInput formHandler={formHandler} />
      <TypeSelect formHandler={formHandler} />
      <CategorySelect formHandler={formHandler} />
      <AmountInput formHandler={formHandler} />
      <DateTimeInput formHandler={formHandler} />
      <Button type="submit" variant="primary" size="lg">
        <Action>Add</Action>
      </Button>
    </form>
  );
}

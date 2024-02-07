import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { Action, t } from "@app/i18n";
import { getTransferFormSchema } from "@app/schemas";
import { accountsStore, toastStore, transactionsStore, user } from "@app/stores";

import { AmountInput, AccountSelect } from "../components/TransferForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form() {
  const formHandler = useFormHandler(yupSchema(getTransferFormSchema({
    date: new Date().toLocaleDateTimePickerString(),
    title: t("TransferBetweenAccountsScreen.title")
  }, accountsStore.accounts().data!)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const userId = user.currentUser().data!.id;
      const formData = formHandler.formData();
      const accounts = accountsStore.accounts().data!;
      const expenseAccount = accounts.find(account => account.id === formData.fromAccount)!;
      const incomeAccount = accounts.find(account => account.id === formData.toAccount)!;
      const transactionDateTime = new Date(formData.date).toISOString();
      const transactionDate = transactionDateTime.split("T")[0];
      await transactionsStore.addTransaction({
        title: formData.title,
        account: formData.fromAccount,
        user: userId,
        type: "expense",
        category: "transferBetweenAccounts",
        amount: formData.expenseAmount,
        currency: expenseAccount.currency,
        transactionDate,
        transactionDateTime,
      });
      await transactionsStore.addTransaction({
        title: formData.title,
        account: formData.toAccount,
        user: userId,
        type: "income",
        category: "transferBetweenAccounts",
        amount: formData.incomeAmount,
        currency: incomeAccount.currency,
        transactionDate,
        transactionDateTime,
      });
      await accountsStore.changeBalance(expenseAccount.id, formData.expenseAmount, "expense");
      await accountsStore.changeBalance(incomeAccount.id, formData.incomeAmount, "income");
      toastStore.pushToast("success", t("TransferBetweenAccountsScreen.success"));
      history.back();
    } catch (e: any) {
      if (e.message) {
        toastStore.pushToast("error", t("TransferBetweenAccountsScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <TitleInput formHandler={formHandler} />
      <AccountSelect formHandler={formHandler} name="fromAccount" />
      <AccountSelect formHandler={formHandler} name="toAccount" />
      <AmountInput
        formHandler={formHandler}
        name="expenseAmount"
        linkedAccountField="fromAccount"
      />
      <AmountInput
        formHandler={formHandler}
        name="incomeAmount"
        linkedAccountField="toAccount"
      />
      <DateTimeInput formHandler={formHandler} />
      <Button type="submit" variant="primary" size="lg">
        <Action>Add</Action>
      </Button>
    </form>
  );
}

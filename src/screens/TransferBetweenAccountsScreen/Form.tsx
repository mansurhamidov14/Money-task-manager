import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { Action, t } from "@app/i18n";
import { getTransferFormSchema } from "@app/schemas";
import { toastStore } from "@app/stores";

import { useAccounts } from "@app/hooks";
import { accountService, transactionService } from "@app/services";
import { AccountSelect, AmountInput } from "../components/TransferForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form() {
  const { accounts, primaryAccount, reloadAccounts } = useAccounts()
  const primaryAccountId = primaryAccount()!.id;
  const formHandler = useFormHandler(yupSchema(getTransferFormSchema({
    date: new Date().toLocaleDateTimePickerString(),
    title: t("TransferBetweenAccountsScreen.title"),
    fromAccount: primaryAccountId,
    toAccount: accounts().data!.find(account => account.id !== primaryAccountId)?.id
  }, accounts().data!)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const formData = formHandler.formData();
      const transactionDateTime = new Date(formData.date).toISOString();
      await transactionService.create({
        account: formData.fromAccount,
        amount: formData.expenseAmount,
        category: "transferBetweenAccounts",
        date: transactionDateTime,
        title: formData.title,
        type: "expense",
      });
      
      await transactionService.create({
        account: formData.toAccount,
        amount: formData.incomeAmount,
        category: "transferBetweenAccounts",
        date: transactionDateTime,
        title: formData.title,
        type: "income",
      });
      await accountService.changeBalance(formData.fromAccount, formData.expenseAmount * -1);
      await accountService.changeBalance(formData.toAccount, formData.incomeAmount);
      toastStore.pushToast("success", t("TransferBetweenAccountsScreen.success"));
      reloadAccounts();
      history.back();
    } catch (e: any) {
      if (e.message && e.status !== 401) {
        toastStore.pushToast("error", t("TransferBetweenAccountsScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
      <div>
        <AccountSelect formHandler={formHandler} name="fromAccount" />
        <AccountSelect formHandler={formHandler} name="toAccount" />
      </div>
      <TitleInput formHandler={formHandler} />
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

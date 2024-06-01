import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { useAccounts } from "@app/hooks";
import { Action, t } from "@app/i18n";
import { getTransactionFormSchema } from "@app/schemas";
import { accountService, transactionService } from "@app/services";
import { toastStore } from "@app/stores";

import {
  AccountSelect,
  AmountInput,
  CategorySelect,
  TypeSelect
} from "../components/TransactionForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form() {
  const { accounts, patchAccount } = useAccounts();
  const formHandler = useFormHandler(yupSchema(getTransactionFormSchema({
    date: new Date().toLocaleDateTimePickerString(),
    account: accounts().data!.find(account => account.primary)?.id,
    category: "market",
    type: "expense"
  }, accounts().data!)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const formData = formHandler.formData();
      const affectedAccount = accounts()
        .data!.find(account => account.id === formData.account)!;
      const type = formData.type;
      const amount = formData.amount;
      let changeAmount = amount;
      if (type === "expense") {
        changeAmount *= -1;
      }
      await transactionService.create({
        ...formData,
        date: new Date(formData.date).toISOString()
      });
      const accountUpdate = await accountService.changeBalance(affectedAccount.id, changeAmount);
      patchAccount(accountUpdate.data);
      toastStore.pushToast("success", t("NewTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      if (e.message && e.status !== 401) {
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

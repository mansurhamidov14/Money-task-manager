import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button } from "@app/components";
import { useAccounts } from "@app/hooks";
import { Action, t } from "@app/i18n";
import { getTransactionFormSchema } from "@app/schemas";
import { accountService, transactionService } from "@app/services";
import { toastStore } from "@app/stores";

import { createSignal } from "solid-js";
import {
  AccountSelect,
  AmountInput,
  CategorySelect,
  TypeSelect
} from "../components/TransactionForm";
import { DateTimeInput, TitleInput } from "../components/shared";

export function Form() {
  const { accounts, patchAccount } = useAccounts();
  const [submitLoading, setSubmitLoading] = createSignal(false);
  const formHandler = useFormHandler(yupSchema(getTransactionFormSchema({
    date: new Date().toLocaleDateTimePickerString(),
    account: accounts().data!.find(account => account.primary)?.id,
    category: "market",
    type: "expense"
  }, accounts().data!)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    setSubmitLoading(true);
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
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <form class="flex flex-col gap-2 mt-4 px-5" onSubmit={handleSubmit}>
      <div class="mb-2">
        <AccountSelect formHandler={formHandler} />
      </div>
      <TitleInput formHandler={formHandler} />
      <TypeSelect formHandler={formHandler} />
      <CategorySelect formHandler={formHandler} />
      <AmountInput formHandler={formHandler} />
      <DateTimeInput formHandler={formHandler} />
      <Button type="submit" variant="primary" size="lg" loading={submitLoading()}>
        <Action>Add</Action>
      </Button>
    </form>
  );
}

import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { IoCloseOutline } from "solid-icons/io";
import { Button } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { transactionService } from "@app/services";
import { transactionsStore, user } from "@app/stores";
import { toastStore } from "@app/stores/toasts";
import {
  AmountInput,
  CategorySelect,
  CurrencySelect,
  DateTimeInput,
  TitleInput,
  TypeSelect
} from "./FormFields";

import { getNewTransactionSchema } from "./schema";

export function NewTransactionScreen() {
  const formHandler = useFormHandler(yupSchema(getNewTransactionSchema({
    date: new Date().toISOString().slice(0, 16),
    currency: user.currentUser().data!.primaryCurrency,
    category: "market",
    type: "expense"
  })), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const transactionData = {
        user: user.currentUser().data!.id,
        title: formHandler.getFieldValue("title"),
        category: formHandler.getFieldValue("category"),
        type: formHandler.getFieldValue("type"),
        currency: formHandler.getFieldValue("currency"),
        amount: Number(formHandler.getFieldValue("amount")),
        createdAt: new Date(formHandler.getFieldValue("date")).getTime(),
      };
      const newTransaction = await transactionService.create(transactionData);
      transactionsStore.addTransaction(newTransaction);
      toastStore.pushToast("success", t("NewTransactionScreen.success"));
      history.back();
    } catch (e) {
      toastStore.pushToast("error", t("NewTransactionScreen.success"));
    }
  }

  return (
    <main class="max-w-md mx-auto">
      <div class="flex gap-3 h-16 items-center border-b bg-white border-secondary-200/30 dark:bg-gray-900/40 px-2 shadow dark:border-gray-700">
        <Button class="rounded-full" variant="glass" size="md" square onClick={() => history.back()}>
          <IoCloseOutline class="text-2xl" />
        </Button>
        <div class="text-xl font-bold flex-1 text-center pe-10">
          <Message>NewTransactionScreen.title</Message>
        </div>
      </div>
      <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
        <TitleInput formHandler={formHandler} />
        <TypeSelect formHandler={formHandler} />
        <CategorySelect formHandler={formHandler} />
        <div class="flex gap-3">
          <div class="w-2/3">
            <AmountInput formHandler={formHandler} />
          </div>
          <div class="w-1/3">
            <CurrencySelect formHandler={formHandler} />
          </div>
        </div>
        <DateTimeInput formHandler={formHandler} />
        <Button type="submit" variant="primary" size="lg">
          <Action>Add</Action>
        </Button>
      </form>
    </main>
  );
}

import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { IoCloseOutline } from "solid-icons/io";
import { Button } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { accountService, transactionService } from "@app/services";
import { accountsStore, transactionsStore, toastStore, user } from "@app/stores";
import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  DateTimeInput,
  TitleInput,
  TypeSelect
} from "./FormFields";

import { getNewTransactionSchema } from "./schema";

export function NewTransactionScreen() {
  const formHandler = useFormHandler(yupSchema(getNewTransactionSchema({
    date: new Date().toISOString().slice(0, 16),
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
      const affectedAccount = accountsStore.accounts()
        .data!.find(account => account.id === formHandler.getFieldValue("account"))!;
      
      const currency = affectedAccount.currency;
      const type = formHandler.getFieldValue("type");
      const amount = formHandler.getFieldValue("amount");
      const transactionData = {
        user: user.currentUser().data!.id,
        account: formHandler.getFieldValue("account"),
        title: formHandler.getFieldValue("title"),
        category: formHandler.getFieldValue("category"),
        type,
        currency,
        amount,
        createdAt: new Date(formHandler.getFieldValue("date")).getTime(),
      };
      const newTransaction = await transactionService.create(transactionData);
      const balanceChange = type === "income" ? amount : amount * -1;
      await accountService.update(affectedAccount.id, { balance: affectedAccount.balance + balanceChange });
      transactionsStore.addTransaction(newTransaction);
      toastStore.pushToast("success", t("NewTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("error", t("NewTransactionScreen.error", undefined, { error: e.message }));
    }
  }

  return (
    <main>
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
        <AccountSelect formHandler={formHandler} />
        <AmountInput formHandler={formHandler} />
        <DateTimeInput formHandler={formHandler} />
        <Button type="submit" variant="primary" size="lg">
          <Action>Add</Action>
        </Button>
      </form>
    </main>
  );
}

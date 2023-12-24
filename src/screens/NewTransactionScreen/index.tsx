import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button, ScreenHeader, VerticalScroll } from "@app/components";
import { Action, t } from "@app/i18n";
import { getNewTransactionSchema } from "@app/schemas";
import { transactionService } from "@app/services";
import { accountsStore, transactionsStore, toastStore, user } from "@app/stores";

import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  DateTimeInput,
  TitleInput,
  TypeSelect
} from "../components/TransactionForm";

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
      const userId = user.currentUser().data!.id;
      const currency = affectedAccount.currency;
      const type = formHandler.getFieldValue("type");
      const amount = formHandler.getFieldValue("amount");
      const transactionDateTime = new Date(formHandler.getFieldValue("date")).toISOString();
      const transactionDate = transactionDateTime.split("T")[0];
      const transactionData = {
        user: userId,
        account: formHandler.getFieldValue("account"),
        title: formHandler.getFieldValue("title"),
        category: formHandler.getFieldValue("category"),
        type,
        currency,
        amount,
        transactionDate,
        transactionDateTime
      };
      const newTransaction = await transactionService.create(transactionData);
      transactionsStore.addTransaction(newTransaction);
      accountsStore.changeBalance(affectedAccount, amount, type);
      toastStore.pushToast("success", t("NewTransactionScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("error", t("NewTransactionScreen.error", undefined, { error: e.message }));
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewTransactionScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
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
      </VerticalScroll>
    </main>
  );
}

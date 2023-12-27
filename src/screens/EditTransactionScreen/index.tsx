import { useNavigate, useParams } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button, Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { dateTimePickerFormat } from "@app/helpers";
import { Action, t } from "@app/i18n";
import { getTransactionFormSchema } from "@app/schemas";
import { transactionService } from "@app/services";
import { accountsStore, transactionsStore, toastStore, Transaction } from "@app/stores";

import {
  AmountInput,
  CategorySelect,
  AccountSelect,
  DateTimeInput,
  TitleInput,
  TypeSelect
} from "../components/TransactionForm";

export function EditTransactionScreen() {
  const [isLoading, setIsLoading] = createSignal(true);
  const routeParams = useParams();
  const navigate = useNavigate();
  const [prevValues, setPrevValues] = createSignal<Transaction>();
  const formHandler = useFormHandler(
    yupSchema(getTransactionFormSchema({}, accountsStore.accounts().data!)),
    { validateOn: ["blur"]}
  );

  onMount(async () => {
    const editedTransaction = await transactionService.getById(Number(routeParams.id));
    if (!editedTransaction) {
      return navigate("/");
    }

    formHandler.setFieldValue("type", editedTransaction.type);
    formHandler.setFieldValue("title", editedTransaction.title);
    formHandler.setFieldValue("amount", editedTransaction.amount);
    formHandler.setFieldValue("account", editedTransaction.account);
    formHandler.setFieldValue("category", editedTransaction.category);
    formHandler.setFieldValue("date", dateTimePickerFormat(new Date(editedTransaction.transactionDateTime)));
    setPrevValues(editedTransaction);
    setIsLoading(false);
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const prevData = prevValues()!;
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
    <main>
      <ScreenHeader withGoBackButton title={t("EditTransactionScreen.title")} />
      <Show when={!isLoading()} fallback={<Loading />}>
        <VerticalScroll hasHeader hasBottomNavigation>
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
        </VerticalScroll>
      </Show>
    </main>
  );
}

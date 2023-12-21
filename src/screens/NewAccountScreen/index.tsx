import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { IoCloseOutline } from "solid-icons/io";
import { Button } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { accountService } from "@app/services";
import { user, toastStore, accountsStore } from "@app/stores";
import { CurrencySelect, BalanceInput, TitleInput } from "./FormFields";

import { getNewAccountSchema } from "./schema";

export function NewAccountScreen() {
  const formHandler = useFormHandler(yupSchema(getNewAccountSchema({
    currency: user.currentUser().data?.primaryCurrency,
  })), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const accountData = {
        user: user.currentUser().data!.id,
        title: formHandler.getFieldValue("title"),
        currency: formHandler.getFieldValue("currency"),
        balance: formHandler.getFieldValue("balance"),
        createdAt: new Date().getTime(),
        skin: 1,
        primary: false
      };
      const newAccount = await accountService.create(accountData);
      accountsStore.addAccount(newAccount);
      toastStore.pushToast("success", t("NewAccountScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("error", t("NewTransactionScreen.error", undefined, { error: e.message }));
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
        <div class="flex gap-3">
          <div class="w-2/3">
            <BalanceInput formHandler={formHandler} />
          </div>
          <div class="w-1/3">
            <CurrencySelect formHandler={formHandler} />
          </div>
        </div>
        <Button type="submit" variant="primary" size="lg">
          <Action>Add</Action>
        </Button>
      </form>
    </main>
  );
}

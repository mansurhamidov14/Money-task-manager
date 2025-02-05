import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { AccountCard, Button } from "@app/components";
import { Action, t } from "@app/i18n";
import { getAccountFormSchema } from "@app/schemas";
import { accountService } from "@app/services";
import { toastStore, user } from "@app/stores";

import { useAccounts } from "@app/hooks";
import { createSignal } from "solid-js";
import {
  BalanceInput,
  CurrencySelect,
  PrimaryCheckbox,
  SkinSelect
} from "../components/AccountForm";
import { TitleInput } from "../components/shared";

export function Form() {
  const [submitLoading, setSubmitLoading] = createSignal(false);
  const { reloadAccounts } = useAccounts();
  const formHandler = useFormHandler(yupSchema(getAccountFormSchema({
    currency: user.currentUser().data?.primaryCurrency,
  })), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      setSubmitLoading(true);
      await formHandler.validateForm();
      const accountData = formHandler.formData();
      await accountService.create(accountData);
      reloadAccounts();
      toastStore.pushToast("success", t("NewAccountScreen.success"));
      history.back();
    } catch (e: any) {
      setSubmitLoading(false);
      if (e.message) {
        toastStore.pushToast("error", t("NewAccountScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <>
      <AccountCard
        account={{
          id: 0,
          title: formHandler.getFieldValue("title"),
          primary: formHandler.getFieldValue("primary"),
          skin: formHandler.getFieldValue("skin"),
          balance: formHandler.getFieldValue("balance"),
          currency: formHandler.getFieldValue("currency"),
          userId: 0,
          createdAt: 0,
          updatedAt: 0
        }}
      />
      <form class="flex flex-col gap-2 mt-4 px-5" onSubmit={handleSubmit}>
        <TitleInput formHandler={formHandler} />
        <div class="flex gap-3">
          <div class="w-2/3">
            <BalanceInput formHandler={formHandler} />
          </div>
          <div class="w-1/3">
            <CurrencySelect formHandler={formHandler} />
          </div>
        </div>
        <SkinSelect formHandler={formHandler} />
        <div class="mb-2">
          <PrimaryCheckbox formHandler={formHandler} />
        </div>
        <Button type="submit" variant="primary" size="lg" loading={submitLoading()}>
          <Action>Add</Action>
        </Button>
      </form>
    </>
  );
}

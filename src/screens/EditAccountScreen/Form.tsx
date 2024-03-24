import { Show, createSignal } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { AccountCardDumb, Button, Loading } from "@app/components";
import { Action, t } from "@app/i18n";
import { getAccountFormSchema } from "@app/schemas";
import { user, toastStore, accountsStore, Account, transactionsStore } from "@app/stores";

import {
  CurrencySelect,
  BalanceInput,
  PrimaryCheckbox,
  SkinSelect
} from "../components/AccountForm";
import { TitleInput } from "../components/shared";

export function Form(props: Account) {
  const userId = user.currentUser().data!.id;
  const [loading, setLoading] = createSignal(false);
  const formHandler = useFormHandler(yupSchema(getAccountFormSchema({
    title: props.title,
    currency: props.currency,
    balance: props.balance,
    skin: props.skin,
    primary: String(props.primary) as "0" | "1",
  })), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await formHandler.validateForm();
      const oldValues = props;
      const formData = {
        ...formHandler.formData(),
        primary: Number(formHandler.getFieldValue("primary")) as 1 | 0,
      }

      if (!oldValues.primary && formData.primary) {
        await accountsStore.removePrimaryFlag(userId);
      }

      if(oldValues.currency !== formData.currency) {
        await transactionsStore.updateCurrencyByAccount(userId, oldValues.id, formData.currency);
      }

      await accountsStore.updateAccount(oldValues.id, formData);
      toastStore.pushToast("success", t("EditAccountScreen.success"));
      history.back();
    } catch (e: any) {
      if (e.message) {
        toastStore.pushToast("error", t("EditAccountScreen.error", undefined, { error: e.message }));
      }
    }
  }

  return (
    <Show when={!loading()} fallback={<Loading />}>
      <AccountCardDumb
        account={{
          id: 0,
          title: formHandler.getFieldValue("title"),
          primary: formHandler.getFieldValue("primary"),
          skin: formHandler.getFieldValue("skin"),
          balance: formHandler.getFieldValue("balance"),
          currency: formHandler.getFieldValue("currency"),
          user: "0",
          createdAt: 0,
          updatedAt: 0
        }}
      />
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
        <SkinSelect formHandler={formHandler} />
        <Show when={!props.primary}>
          <PrimaryCheckbox formHandler={formHandler} />
        </Show>
        <Button type="submit" variant="primary" size="lg">
          <Action>Edit</Action>
        </Button>
      </form>
    </Show>
  );
}

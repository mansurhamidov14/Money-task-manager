import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { AccountCardDumb, Button, ScreenHeader, VerticalScroll } from "@app/components";
import { Action, t } from "@app/i18n";
import { getAccountFormSchema } from "@app/schemas";
import { accountService } from "@app/services";
import { user, toastStore, accountsStore, counters, initCountersStore } from "@app/stores";

import {
  CurrencySelect,
  BalanceInput,
  TitleInput,
  PrimaryCheckbox,
  SkinSelect
} from "../components/AccountForm";

export function NewAccountScreen() {
  const formHandler = useFormHandler(yupSchema(getAccountFormSchema({
    currency: user.currentUser().data?.primaryCurrency,
  })), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();

      /** Type conversion due to validation bug with 0 number */
      const isPrimary = Number(formHandler.getFieldValue("primary")) as any;
      const userId = user.currentUser().data!.id;
      if (isPrimary) {
        await accountsStore.removePrimaryFlag(userId);
      }
      const accountData = {
        user: user.currentUser().data!.id,
        title: formHandler.getFieldValue("title"),
        currency: formHandler.getFieldValue("currency"),
        balance: formHandler.getFieldValue("balance"),
        createdAt: new Date().getTime(),
        skin: formHandler.getFieldValue("skin"),
        primary: isPrimary
      };
      const newAccount = await accountService.create(accountData);
      counters[newAccount.id] = initCountersStore([]);
      accountsStore.addAccount(newAccount);
      toastStore.pushToast("success", t("NewAccountScreen.success"));
      history.back();
    } catch (e: any) {
      toastStore.pushToast("error", t("NewAccountScreen.error", undefined, { error: e.message }));
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("NewAccountScreen.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <AccountCardDumb
          account={{
            id: 0,
            title: formHandler.getFieldValue("title"),
            primary: formHandler.getFieldValue("primary"),
            skin: formHandler.getFieldValue("skin"),
            balance: formHandler.getFieldValue("balance"),
            currency: formHandler.getFieldValue("currency"),
            user: 0,
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
          <PrimaryCheckbox formHandler={formHandler} />
          <Button type="submit" variant="primary" size="lg">
            <Action>Add</Action>
          </Button>
        </form>
      </VerticalScroll>
    </main>
  );
}

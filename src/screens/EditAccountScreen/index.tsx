import { Show, createSignal, onMount } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { useNavigate, useParams } from "@solidjs/router";

import {AccountCardDumb, Button, Loading, ScreenHeader, VerticalScroll } from "@app/components";
import { Action, t } from "@app/i18n";
import { getAccountFormSchema } from "@app/schemas";
import { accountService } from "@app/services";
import { user, toastStore, accountsStore, Account, transactionsStore } from "@app/stores";

import {
  CurrencySelect,
  BalanceInput,
  TitleInput,
  PrimaryCheckbox,
  SkinSelect
} from "../components/AccountForm";


export function EditAccountScreen() {
  const userId = user.currentUser().data!.id;
  const [isLoading, setIsLoading] = createSignal(true);
  const [prevValues, setPrevValues] = createSignal<Account>();
  const navigate = useNavigate();
  const routeParams = useParams();
  const formHandler = useFormHandler(yupSchema(getAccountFormSchema({
    currency: user.currentUser().data?.primaryCurrency,
  })), {
    validateOn: ["blur"],
  });

  onMount(async () => {
    const account = await accountService.getById(Number(routeParams.id), userId);
    if (!account) {
      return navigate("/");
    }

    formHandler.setFieldValue("title", account.title);
    formHandler.setFieldValue("balance", account.balance);
    formHandler.setFieldValue("currency", account.currency);
    formHandler.setFieldValue("skin", account.skin);
    formHandler.setFieldValue("primary", String(account.primary));
    setPrevValues(account);
    setIsLoading(false);
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await formHandler.validateForm();
      const oldValues = prevValues()!;
      const formData = {
        ...formHandler.formData(),
        primary: Number(formHandler.getFieldValue("primary")) as 1 | 0,
      }

      if (!oldValues.primary && formData.primary) {
        console.log("Changing primary account");
        await accountsStore.removePrimaryFlag(userId);
      }

      if(oldValues.currency !== formData.currency) {
        console.log("Changing account currency");
        await transactionsStore.updateCurrencyByAccount(userId, oldValues.id, formData.currency);
      }

      await accountsStore.updateAccount(oldValues.id, formData);
      toastStore.pushToast("success", t("EditAccountScreen.success"));
      history.back();
    } catch (e: any) {
      console.log(e);
      toastStore.pushToast("error", t("EditAccountScreen.error", undefined, { error: e.message }));
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("EditAccountScreen.title")} />
      <Show when={!isLoading()} fallback={<Loading />}>
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
              <Action>Edit</Action>
            </Button>
          </form>
        </VerticalScroll>
      </Show>
    </main>
  );
}

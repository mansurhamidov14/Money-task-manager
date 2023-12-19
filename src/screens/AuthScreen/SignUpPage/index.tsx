import { useNavigate } from "@solidjs/router";
import { yupSchema } from "solid-form-handler/yup";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { Button, Select, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link, transactionsStore, user } from "@app/stores";
import { CurrencyCode, currencies } from "@app/constants";
import { transactionService, userService } from "@app/services";
import { Field, useFormHandler } from "solid-form-handler";
import { getSignUpFormSchema } from "./schema";
import { For } from "solid-js";
import { AuthLayout } from "../AuthLayout";

export function SignUpPage() {
  const formHandler = useFormHandler(yupSchema(getSignUpFormSchema()), {
    validateOn: ["blur"],
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const createdAt = Date.now();
      const userData = {
        firstName: formHandler.getFieldValue("firstName"),
        lastName: formHandler.getFieldValue("lastName"),
        email: formHandler.getFieldValue("email").toLowerCase(),
        password: formHandler.getFieldValue("newPassword"),
        primaryCurrency: formHandler.getFieldValue("primaryCurrency"),
        createdAt,
        updatedAt: createdAt
      };
      const newUser = await userService.signUp(userData);
      user.setCurrentUser({
        isLoading: false,
        isAuthorized: true,
        data: newUser
      });
      const transactions = await transactionService.getUserTransactions(newUser.id);
      setTimeout(() => transactionsStore.setTransactions(transactions), 500);
      navigate("/");
    } catch (e) { }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around max-w-sm mx-auto px-5">
        <Field
          mode="input"
          name="firstName"
          formHandler={formHandler}
          render={(field) => (
            <TextInput
              autocomplete="off"
              id="firstName"
              label={t("AuthScreen.FormFields.FirstName.label")}
              placeholder={t("AuthScreen.FormFields.FirstName.placeholder")}
              errorMessage={field.helpers.errorMessage}
              {...field.props}
            />
          )}
        />
        <Field
          mode="input"
          name="lastName"
          formHandler={formHandler}
          render={(field) => (
            <TextInput
              autocomplete="off"
              id="lastName"
              label={t("AuthScreen.FormFields.LastName.label")}
              placeholder={t("AuthScreen.FormFields.LastName.placeholder")}
              errorMessage={field.helpers.errorMessage}
              {...field.props}
            />
          )}
        />
        <Field
          mode="input"
          name="email"
          formHandler={formHandler}
          render={(field) => (
            <TextInput
              autocomplete="off"
              id="email"
              label={t("AuthScreen.FormFields.Email.label")}
              placeholder="youremail@example.com"
              addonStart={<FiAtSign class="text-lg" />}
              errorMessage={field.helpers.errorMessage}
              {...field.props}
            />
          )}
        />
        <Field
          mode="input"
          name="newPassword"
          formHandler={formHandler}
          render={(field) => (
            <TextInput
              id="newPassword"
              type="password"
              label={t("AuthScreen.FormFields.Password.label")}
              placeholder="••••••••••"
              addonStart={<IoKey class="text-lg" />}
              errorMessage={field.helpers.errorMessage}
              {...field.props}
            />
          )}
        />
        <Field
          mode="input"
          name="primaryCurrency"
          formHandler={formHandler}
          render={(field) => (
            <Select
              id="primaryCurrency"
              label={t("AuthScreen.FormFields.Currency.label")}
              addonStart={<img src={currencies[formHandler.getFieldValue("primaryCurrency") as CurrencyCode]?.flag} class="w-full" />}
              errorMessage={field.helpers.errorMessage}
              {...field.props}
            >
              <For each={Object.values(currencies)}>
                {currency => (
                  <option value={currency.code}>
                    {t(`AuthScreen.FormFields.Currency.Options.${currency.code}`)}
                  </option>
                )}
              </For>
            </Select>
          )}
        />
        <Button variant="primary" size="lg" type="submit">
          <Action>SignUp</Action>
        </Button>
        <div class="text-sm pt-3 pb-4 font-medium">
          <span class="flex justify-center gap-2">
            <Message>AuthScreen.alreadyHaveAnAccount</Message>
            {" "}
            <Link class="text-primary-500 dark:text-primary-400 font-semibold" href="/auth">
              <Message>
                AuthScreen.signIn
              </Message>
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

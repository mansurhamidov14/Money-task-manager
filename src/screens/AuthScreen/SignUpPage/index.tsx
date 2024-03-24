import { Navigate, useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import { yupSchema } from "solid-form-handler/yup";
import { Field, useFormHandler } from "solid-form-handler";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";

import { Button, Select, TextInput } from "@app/components";
import { avatars } from "@app/screens/SettingsScreen/constants";
import { getRandomElement } from "@app/helpers";
import { Action, Message, t } from "@app/i18n";
import { getSignUpFormSchema } from "@app/schemas";
import { authService, accountService, currencyService, userService } from "@app/services";
import { Link, user } from "@app/stores";

import { AuthLayout } from "../AuthLayout";
import { FIRST_RUN_STORE_KEY } from "@app/constants";

export function SignUpPage() {
  const formHandler = useFormHandler(yupSchema(getSignUpFormSchema()), {
    validateOn: ["blur"],
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const formData = formHandler.formData();
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase(),
        password: formData.password,
        primaryCurrency: formData.primaryCurrency,
        avatar: getRandomElement(avatars),
      };
      const { user: newUser, access_token } = await authService.signUp(userData);
      userService.setAccessToken(access_token);
      await accountService.create({
        user: newUser.id,
        title: t("common.initialAccountName"),
        currency: formHandler.getFieldValue("primaryCurrency"),
        balance: 0,
        skin: "green",
        primary: 1,
      });
      user.setCurrentUser({
        status: "locked",
        data: newUser
      });
      localStorage.setItem(FIRST_RUN_STORE_KEY, "1");
      navigate("/auth/pin");
    } catch (e) { }
  }

  return (
    <Show when={user.currentUser().status === "unauthorized"} fallback={<Navigate href="/auth/pin" />}>
      <AuthLayout>
        <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around px-5 max-w-md mx-auto">
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
            name="password"
            formHandler={formHandler}
            render={(field) => (
              <TextInput
                id="password"
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
                addonStart={
                  <Show when={field.props.value}>
                    <img src={currencyService.getFlag(field.props.value)} class="w-full" />
                  </Show>
                }
                errorMessage={field.helpers.errorMessage}
                {...field.props}
              >
                <For each={currencyService.avaliableCurrencies}>
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
    </Show>
  );
}

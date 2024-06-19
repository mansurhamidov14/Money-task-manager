import { Navigate, useNavigate } from "@solidjs/router";
import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { FiAtSign } from "solid-icons/fi";
import { IoKey } from "solid-icons/io";
import { Show } from "solid-js";

import { Button, TextInput } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { getLoginFormSchema } from "@app/schemas";
import { authService, authUserHttpClient } from "@app/services";
import { Link, toastStore, user } from "@app/stores";

import { firstRunHappened } from "@app/storage";
import { AuthLayout } from "../AuthLayout";

export function LoginPage() {
  const formHandler = useFormHandler(yupSchema(getLoginFormSchema()), {
    validateOn: ["blur"]
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const email = formHandler.getFieldValue("email");
      const password = formHandler.getFieldValue("password");
      const data = await authService.auth(email.toLowerCase(), password);
      authUserHttpClient.accessToken = data.access_token;
      user.setCurrentUser({ status: "authorized", data: data.user });
      firstRunHappened.value = true;
      navigate("/");
    } catch (e: any) {
      toastStore.handleServerError(e);
    }
  }

  return (
    <Show when={user.currentUser().status === "unauthorized"} fallback={<Navigate href="/auth/pin" />}>
      <AuthLayout>
        <form onSubmit={handleSubmit} class="flex flex-col gap-2 justify-around px-5 max-w-md mx-auto">
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
                addonStart={<FiAtSign />}
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
                addonStart={<IoKey />}
                errorMessage={field.helpers.errorMessage}
                {...field.props}
              />
            )}
          />
          <Button variant="primary" size="lg" type="submit">
            <Action>SignIn</Action>
          </Button>
          <div class="text-sm pt-10 pb-4 font-medium">
            <span class="flex gap-2 justify-center">
              <Message>AuthScreen.dontHaveAnAccount</Message>
              {" "}
              <Link class="text-primary-500 dark:text-primary-400 font-semibold" href="/auth/signup">
                <Message>
                  AuthScreen.signUp
                </Message>
              </Link>
            </span>
          </div>
        </form>
      </AuthLayout>
    </Show>
  );
}

import { Navigate, useNavigate } from "@solidjs/router";
import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";

import { Button, TextInput } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { getLoginFormSchema } from "@app/schemas";
import { userService } from "@app/services";
import { Link, toastStore, user } from "@app/stores";

import { AuthLayout } from "../AuthLayout";
import { Show } from "solid-js";

export function LoginPage() {
  const formHandler = useFormHandler(yupSchema(getLoginFormSchema()), {
    validateOn: ["blur"]
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const email = formHandler.getFieldValue("email");
      const password = formHandler.getFieldValue("password");
      const data = await userService.auth(email.toLowerCase(), password);
      user.setCurrentUser({ status: "authorized", data });
      navigate("/");
    } catch (e: any) {
      toastStore.pushToast("error", t(`AuthScreen.Exceptions.${e.message}`));
    }
  }

  return (
    <Show when={user.currentUser().status === "unauthorized"} fallback={<Navigate href="/auth/pin" />}>
      <AuthLayout>
        <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around px-5 max-w-md mx-auto">
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

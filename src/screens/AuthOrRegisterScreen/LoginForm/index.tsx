import { useNavigate } from "@solidjs/router";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { Button, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link, user } from "@app/stores";
import { userService } from "@app/services";
import { toastStore } from "@app/stores/toasts";
import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { getLoginFormSchema } from "./schema";

export function LoginForm() {
  const formHandler = useFormHandler(yupSchema(getLoginFormSchema()), {
    validateOn: ["blur"]
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const email = formHandler.getFieldValue("email");
      const password = formHandler.getFieldValue("password");
      const data = await userService.auth(email, password);
      user.setCurrentUser({
        isLoading: false,
        isAuthorized: true,
        data
      });
      navigate("/");
    } catch (e: any) {
      toastStore.pushToast("error", t(`AuthScreen.Exceptions.${e.message}`));
      ("");
    }
  }

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around max-w-sm mx-auto px-5">
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
          <Link class="text-primary-500 dark:text-primary-400 font-semibold" href="/auth/register">
            <Message>
              AuthScreen.signUp
            </Message>
          </Link>
        </span>
      </div>
    </form>
  );
}

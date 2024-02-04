import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { IoKey } from "solid-icons/io";

import { Button, TextInput } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { getLoginFormSchema } from "@app/schemas";
import { userService } from "@app/services";
import { user } from "@app/stores";

import { AuthLayout } from "../AuthLayout";
import { createSignal } from "solid-js";

export type PasswordAuthProps = {
  onRememberPin: () => void;
}

export function PasswordAuth(props: PasswordAuthProps) {
  const currentUser = user.currentUser().data!;
  const formHandler = useFormHandler(yupSchema(getLoginFormSchema(currentUser.email)), {
    validateOn: ["blur"]
  });
  const [passwordError, setPasswordError] = createSignal<null | string>(null);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateField();
      const { email, password } = formHandler.formData();
      await userService.removePinProtectionByPassword(email.toLowerCase(), password);
      user.setCurrentUser({
        status: "locked",
        data: { ...user.currentUser().data!, hasPinProtection: 0 }
      });
    } catch (e: any) {
      setPasswordError(e.message);
    }
  }

  const handleRememberClick = async (event: MouseEvent) => {
    event.preventDefault();
    props.onRememberPin();
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around px-5 max-w-md mx-auto">
        <div class="text-center">
          {user.currentUser().data!.email}
        </div>
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
              errorMessage={field.helpers.errorMessage || passwordError()}
              {...field.props}
            />
          )}
        />
        <Button variant="primary" size="lg" type="submit">
          <Action>SignIn</Action>
        </Button>
        <div class="text-sm pt-4 font-semibold text-center">
          <a href="#" onClick={handleRememberClick} class="text-primary-500 dark:text-primary-400">
            <Message>AuthScreen.PINInput.rememberPIN</Message>
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}

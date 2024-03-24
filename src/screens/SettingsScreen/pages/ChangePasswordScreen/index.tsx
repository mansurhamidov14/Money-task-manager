import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { Button, ScreenHeader, VerticalScroll, TextInput } from "@app/components";
import { Action, t } from "@app/i18n";
import { getChangePasswordSchema } from "@app/schemas";
import { toastStore } from "@app/stores";
import { userService } from "@app/services";

export function ChangePasswordScreen() {
  const formHandler = useFormHandler(yupSchema(getChangePasswordSchema()), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const formData = formHandler.formData();
      await formHandler.validateForm();
      await userService.resetPassword(formData.password, formData.newPassword);
      toastStore.pushToast("success", t("SettingsScreen.changePassword.success"), undefined, toastStore.TIMEOUT_SHORT);
      history.back();
    } catch (e: any) {
      toastStore.handleServerError(e);
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("SettingsScreen.changePassword.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
          <Field
            mode="input"
            name="password"
            formHandler={formHandler}
            render={(field) => (
              <TextInput
                id="password"
                type="password"
                label={t("SettingsScreen.changePassword.oldPassword")}
                placeholder="••••••••••"
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
                label={t("SettingsScreen.changePassword.newPassword")}
                placeholder="••••••••••"
                errorMessage={field.helpers.errorMessage}
                {...field.props}
              />
            )}
          />
          <Field
            mode="input"
            name="repeatPassword"
            formHandler={formHandler}
            render={(field) => (
              <TextInput
                id="repeatPassword"
                type="password"
                label={t("SettingsScreen.changePassword.repeatPassword")}
                placeholder="••••••••••"
                errorMessage={field.helpers.errorMessage}
                {...field.props}
              />
            )}
          />
          <Button type="submit" variant="primary" size="lg">
            <Action>Save</Action>
          </Button>
        </form>
      </VerticalScroll>
    </main>
  );
}

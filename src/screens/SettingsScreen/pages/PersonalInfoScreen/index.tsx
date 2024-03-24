import { Field, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";

import { Button, ScreenHeader, VerticalScroll, TextInput } from "@app/components";
import { Action, t } from "@app/i18n";
import { getPersonalInfoSchema } from "@app/schemas";
import { toastStore, user } from "@app/stores";
import { userService } from "@app/services";

export function PersonalInfoScreen() {
  const currentUser = user.currentUser().data!
  const formHandler = useFormHandler(yupSchema(getPersonalInfoSchema(currentUser)), {
    validateOn: ["blur"],
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      const formData = formHandler.formData();
      await userService.update(formData);
      user.updateUserData(formData);
      toastStore.pushToast("success", t("SettingsScreen.personalInfo.success"), undefined, toastStore.TIMEOUT_SHORT);
      history.back();
    } catch (e: any) {
      toastStore.handleServerError(e);
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("SettingsScreen.personalInfo.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <form class="flex flex-col gap-6 mt-4 px-5" onSubmit={handleSubmit}>
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
          <Button type="submit" variant="primary" size="lg">
            <Action>Save</Action>
          </Button>
        </form>
      </VerticalScroll>
    </main>
  );
}

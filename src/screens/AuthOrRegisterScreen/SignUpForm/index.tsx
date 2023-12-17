import { useNavigate } from "@solidjs/router";
import { yupSchema } from "solid-form-handler/yup";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { Button, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link, user } from "@app/stores";
import { CurrencyCode } from "@app/constants";
import { userService } from "@app/services";
import { Field, useFormHandler } from "solid-form-handler";
import { signUpFormSchema } from "./schema";

export function RegisterScreen() {
  const formHandler = useFormHandler(yupSchema(signUpFormSchema), {
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
        email: formHandler.getFieldValue("email"),
        password:  formHandler.getFieldValue("password"),
        currency: CurrencyCode.USD,
        createdAt,
        updatedAt: createdAt
      };
      const newUser = await userService.signUp(userData);
      user.setCurrentUser({
        isLoading: false,
        isAuthorized: true,
        data: newUser
      });
      navigate("/");
    } catch (e) { }
  }

  return (
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
            id="lastName"
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
        <Action>SignUp</Action>
      </Button>
      <div class="text-sm pt-6 pb-4 font-medium">
        <span class="flex justify-center gap-2">
          <Message>AuthScreen.alreadyHaveAnAccount</Message>
          {" "}
          <Link class="text-primary-500 dark:text-primary-400 font-semibold" href="/auth/signin">
            <Message>
              AuthScreen.signIn
            </Message>
          </Link>
        </span>
      </div>
    </form>
  );
}

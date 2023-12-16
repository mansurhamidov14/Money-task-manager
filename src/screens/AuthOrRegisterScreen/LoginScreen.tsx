import { Button, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link } from "@app/stores";

export function LoginScreen() {
  return (
    <form class="flex flex-col gap-5 justify-around max-w-sm mx-auto px-3">
      <TextInput
        autocomplete="off"
        id="email"
        type="email"
        label={t("AuthScreen.FormFields.Email.label")}
        placeholder="youremail@example.com"
        addonStart={<FiAtSign />}
      />
      <TextInput
        autocomplete="off"
        id="password"
        type="password"
        label={t("AuthScreen.FormFields.Password.label")}
        placeholder="••••••••••"
        addonStart={<IoKey />}
      />
      <Button variant="primary" size="md" type="submit">
        <Action>SignIn</Action>
      </Button>
      <div class="text-center pt-10 pb-4 font-medium">
        <span>
          <Message>AuthScreen.dontHaveAnAccount</Message>
          <br />
          <Link class="text-primary-500 font-semibold" href="/auth/register">
            <Message>
              AuthScreen.signUp
            </Message>
          </Link>
        </span>
      </div>
    </form>
  );
}

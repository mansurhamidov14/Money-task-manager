import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { Button, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link, user } from "@app/stores";
import { userService } from "@app/services";

export function LoginScreen() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      const data = await userService.auth(email(), password());
      user.setCurrentUser({
        isLoading: false,
        isAuthorized: true,
        data
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-5 justify-around max-w-sm mx-auto px-5">
      <TextInput
        autocomplete="off"
        id="email"
        type="email"
        label={t("AuthScreen.FormFields.Email.label")}
        placeholder="youremail@example.com"
        addonStart={<FiAtSign />}
        value={email()}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        autocomplete="off"
        id="password"
        type="password"
        label={t("AuthScreen.FormFields.Password.label")}
        placeholder="••••••••••"
        addonStart={<IoKey />}
        value={password()}
        onChange={(e) => setPassword(e.target.value)}
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

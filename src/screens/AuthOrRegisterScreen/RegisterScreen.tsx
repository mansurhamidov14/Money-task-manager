import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { IoKey } from "solid-icons/io";
import { FiAtSign } from "solid-icons/fi";
import { Button, TextInputWithFloatingLabel as TextInput } from "@app/components";
import { t } from "@app/i18n";
import { Action, Message } from "@app/i18n/components";
import { Link, user } from "@app/stores";
import { CurrencyCode } from "@app/constants";
import { userService } from "@app/services";

export function RegisterScreen() {
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const createdAt = Date.now();
    const userData = {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: password(),
      currency: CurrencyCode.USD,
      createdAt,
      updatedAt: createdAt
    };
    try {
      const newUser = await userService.signUp(userData);
      user.setCurrentUser({
        isLoading: false,
        isAuthorized: true,
        data: newUser
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
        id="firstName"
        label={t("AuthScreen.FormFields.FirstName.label")}
        placeholder={t("AuthScreen.FormFields.FirstName.placeholder")}
        value={firstName()}
        onChange={e => setFirstName(e.target.value)}
        required
      />
      <TextInput
        autocomplete="off"
        id="lastName"
        label={t("AuthScreen.FormFields.LastName.label")}
        placeholder={t("AuthScreen.FormFields.LastName.placeholder")}
        value={lastName()}
        onChange={e => setLastName(e.target.value)}
        required
      />
      <TextInput
        autocomplete="off"
        id="email"
        type="email"
        label={t("AuthScreen.FormFields.Email.label")}
        placeholder="youremail@example.com"
        addonStart={<FiAtSign />}
        value={email()}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextInput
        autocomplete="off"
        id="password"
        type="password"
        label={t("AuthScreen.FormFields.Password.label")}
        placeholder="••••••••••"
        addonStart={<IoKey />}
        value={password()}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button variant="primary" size="md" type="submit">
        <Action>SignUp</Action>
      </Button>
      <div class="text-center text-sm pt-6 pb-4 font-medium">
        <span>
          <Message>AuthScreen.alreadyHaveAnAccount</Message>
          {" "}
          <Link class="text-primary-500 font-semibold" href="/auth/signin">
            <Message>
              AuthScreen.signIn
            </Message>
          </Link>
        </span>
      </div>
    </form>
  );
}

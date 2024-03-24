import { PinInput } from "@app/components";
import { Message, t } from "@app/i18n";
import { user } from "@app/stores";
import { createSignal } from "solid-js";
import { AuthLayout } from "../AuthLayout";
import { userService } from "@app/services";
import { vibrate } from "@app/helpers";
import { REDIRECT_URL_STORE_KEY } from "@app/constants";
import { useNavigate } from "@solidjs/router";

export type PinAuthProps = {
  onForgotPin: () => void;
}

export function PinAuth(props: PinAuthProps) {
  const navigate = useNavigate();
  const [pin, setPin] = createSignal("");
  const [pinError, setPinError] = createSignal<string | null>(null);

  const handleSubmit = async (value: string) => {
    try {
      await userService.validatePin(value);
      user.setCurrentUser({ status: "authorized", data: user.currentUser().data });
      const nextUrl = localStorage.getItem(REDIRECT_URL_STORE_KEY);
      localStorage.removeItem(REDIRECT_URL_STORE_KEY);
      if (nextUrl) {
        navigate(nextUrl);
      }
    } catch (e: any) {
      vibrate();
      setPinError(t(e.message, "Exceptions"));
      setPin("");
    }
  }

  const handleForgotClick = (e: MouseEvent) => {
    e.preventDefault();
    props.onForgotPin();
  }

  return (
    <AuthLayout>
      <div class="flex flex-col">
        <div class="text-center font-bold text-xl">
          <Message>
            AuthScreen.PINInput.greeting
          </Message>
          {" "}
          <span class="text-primary-600 dark:text-primary-400">{user.currentUser().data!.firstName}!</span>
        </div>
        <PinInput
          value={pin}
          onChange={setPin}
          onSubmit={handleSubmit}
          error={pinError()}
          onClearError={() => setPinError(null)}
        />
        <div class="text-sm pt-10 font-semibold text-center">
          <a href="#" onClick={handleForgotClick} class="text-primary-500 dark:text-primary-400">
            <Message>AuthScreen.PINInput.forgotPIN</Message>
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
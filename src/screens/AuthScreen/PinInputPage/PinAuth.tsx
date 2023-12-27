import { PinInput } from "@app/components";
import { Message, t } from "@app/i18n";
import { toastStore, user } from "@app/stores";
import { createSignal } from "solid-js";
import { AuthLayout } from "../AuthLayout";
import { userService } from "@app/services";
import { vibrate } from "@app/helpers";

export type PinAuthProps = {
  onForgotPin: () => void;
}

export function PinAuth(props: PinAuthProps) {
  const [pin, setPin] = createSignal("");
  const [pinError, setPinError] = createSignal<string | null>(null);

  const handleSubmit = async (value: string) => {
    try {
      const isValid = await userService.validatePin(user.currentUser().data!.id, value);
      if (!isValid) {
        vibrate([200]);
        setPinError(t("AuthScreen.PINInput.invalidPIN"));
        setPin("");
      } else {
        user.setCurrentUser({ status: "authorized", data: user.currentUser().data });
      }
    } catch (e: any) {
      setPin("");
      toastStore.pushToast("error", e.message);
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
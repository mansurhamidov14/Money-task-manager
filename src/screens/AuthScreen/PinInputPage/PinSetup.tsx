import { PinInput } from "@app/components";
import { Message, t } from "@app/i18n";
import { toastStore, user } from "@app/stores";
import { Show, createSignal } from "solid-js";
import { AuthLayout } from "../AuthLayout";
import { userService } from "@app/services";

export function PinSetup() {
  const [currentStep, setCurrentStep] = createSignal<1 | 2>(1);
  const [prevValue, setPrevValue] = createSignal("");
  const [currentValue, setCurrentValue] = createSignal("");

  const handleSubmit = async (value: string) => {
    if (currentStep() === 1) {
      setPrevValue(value);
      setCurrentValue("");
      setCurrentStep(2);
    } else {
      if (value !== prevValue()) {
        toastStore.pushToast("error", t("AuthScreen.PINInput.confirmationError"));
        setCurrentValue("");
      } else {
        const currentUser = user.currentUser().data!;
        user.setCurrentUser({ status: "loading" });
        await userService.setUpPinProtection(currentUser, currentValue());
        user.setCurrentUser({
          status: "authorized",
          data: { ...currentUser, hasPinProtection: 1 }
        });
      }
    }
  }

  return (
    <AuthLayout>
      <div class="flex flex-col gap-4">
        <div class="text-center font-medium">
          <Show
            when={currentStep() === 1}
            fallback={<Message>AuthScreen.PINInput.confirmPIN</Message>}
          >
            <Message>AuthScreen.PINInput.enterNewPIN</Message>
          </Show>
        </div>
        <PinInput
          value={currentValue}
          onChange={setCurrentValue}
          onSubmit={handleSubmit}
        />
      </div>
    </AuthLayout>
  );
}
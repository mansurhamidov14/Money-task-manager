import { Button, PinInput } from "@app/components";
import { Action, Message, t } from "@app/i18n";
import { user } from "@app/stores";
import { Show, createSignal } from "solid-js";
import { AuthLayout } from "../AuthLayout";
import { userService } from "@app/services";
import { FaSolidChevronLeft, FaSolidChevronRight } from "solid-icons/fa";

export function PinSetup() {
  const [currentStep, setCurrentStep] = createSignal<1 | 2>(1);
  const [prevValue, setPrevValue] = createSignal("");
  const [currentValue, setCurrentValue] = createSignal("");
  const [pinError, setPinError] = createSignal<string | null>(null);

  const handleGoBack = () => {
    setCurrentStep(1);
    setCurrentValue("");
  }
  const handleSkip = () => user.setCurrentUser(prevState => ({ ...prevState, status: "authorized" }));

  const handleSubmit = async (value: string) => {
    if (currentStep() === 1) {
      setPrevValue(value);
      setCurrentValue("");
      setCurrentStep(2);
    } else {
      if (value !== prevValue()) {
        window.navigator.vibrate(200);
        setPinError(t("AuthScreen.PINInput.confirmationError"));
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
      <div class="flex flex-col">
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
          error={pinError()}
          onClearError={() => setPinError(null)}
          onChange={setCurrentValue}
          onSubmit={handleSubmit}
        />
        <Show when={currentStep() === 2}>
          <Button size="lg" variant="transparent" class="gap-1 text-md absolute bottom-3 left-3 text-primary-600 dark:text-primary-400" onClick={handleGoBack}>
            <FaSolidChevronLeft />
            <Action>Back</Action>
          </Button>
        </Show>
        <Button size="lg" variant="transparent" class="gap-1 text-md absolute bottom-3 right-3 text-primary-600 dark:text-primary-400" onClick={handleSkip}>
          <Action>Skip</Action>
          <FaSolidChevronRight />
        </Button>
      </div>
    </AuthLayout>
  );
}
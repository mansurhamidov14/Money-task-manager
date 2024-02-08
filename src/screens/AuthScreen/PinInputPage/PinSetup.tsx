import { Show, createSignal } from "solid-js";
import { FaSolidChevronLeft, FaSolidChevronRight } from "solid-icons/fa";
import { Button, PinInput } from "@app/components";
import { vibrate } from "@app/helpers";
import { Action, Message, t } from "@app/i18n";
import { accountService, userService } from "@app/services";
import { user } from "@app/stores";

import { AuthLayout } from "../AuthLayout";
import { useNavigate } from "@solidjs/router";

export function PinSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = createSignal<1 | 2>(1);
  const [prevValue, setPrevValue] = createSignal("");
  const [currentValue, setCurrentValue] = createSignal("");
  const [pinError, setPinError] = createSignal<string | null>(null);

  const navigateToInitialAccountEdit = async () => {
    const [initialAccount] = await accountService.getUserAccounts(user.currentUser().data!.id);
    navigate(`/edit-account/${initialAccount.id}`);
  }

  const handleGoBack = () => {
    setCurrentStep(1);
    setCurrentValue("");
  }
  const handleSkip = async () => {
    user.setCurrentUser(prevState => ({ ...prevState, status: "authorized" }));
    navigateToInitialAccountEdit();
  }

  const handleSubmit = async (value: string) => {
    if (currentStep() === 1) {
      setPrevValue(value);
      setCurrentValue("");
      setCurrentStep(2);
    } else {
      if (value !== prevValue()) {
        vibrate();
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
        await navigateToInitialAccountEdit();
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
          <Button size="lg" variant="ghost" class="gap-1 text-md absolute bottom-3 left-3" onClick={handleGoBack}>
            <FaSolidChevronLeft />
            <Action>Back</Action>
          </Button>
        </Show>
        <Button size="lg" variant="ghost" class="gap-1 text-md absolute bottom-3 right-3" onClick={handleSkip}>
          <Action>Skip</Action>
          <FaSolidChevronRight />
        </Button>
      </div>
    </AuthLayout>
  );
}
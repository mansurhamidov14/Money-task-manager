import { Button, PinInput, ScreenHeader, VerticalScroll } from "@app/components";
import { vibrate } from "@app/helpers";
import { Action, Message, t } from "@app/i18n";
import { userService } from "@app/services";
import { toastStore, user } from "@app/stores";
import { FaSolidChevronLeft, FaSolidLockOpen } from "solid-icons/fa";
import { Match, Switch, createSignal } from "solid-js";

export function ChangePinScreen() {
  const currentUser = user.currentUser().data!;
  const [validCurrentPin, setValidCurrentPin] = createSignal("");
  const [prevValue, setPrevValue] = createSignal("");
  const [currentValue, setCurrentValue] = createSignal("");
  const [currentStep, setCurrentStep] = createSignal<1 | 2 | 3>(currentUser.hasPinProtection ? 1 : 2);
  const [loading, setLoading] = createSignal(false);
  const [pinError, setPinError] = createSignal<null | string>(null);

  const handleFirstStep = async (value: string) => {
    setLoading(true);
    try {
      await userService.validatePin(value);
      setCurrentStep(2);
      setValidCurrentPin(value);
      setPinError(null);
    } catch (e: any) {
      vibrate();
      setPinError(t(e.message, "Exceptions"));
    } finally {
      setLoading(false);
      setCurrentValue("");
    }
  }

  const handleSecondStep = (value: string) => {
    setPrevValue(value);
    setCurrentValue("");
    setCurrentStep(3);
  }

  const handleThirdStep = async (value: string) => {
    const arePINsEqual = value === prevValue();
    setCurrentValue("");

    if (arePINsEqual) {
      try {
        await userService.setUpPinProtection(validCurrentPin(), value);
        user.updateUserData({ hasPinProtection: 1 });
        toastStore.pushToast("success", t("SettingsScreen.pinCode.success"), undefined, toastStore.TIMEOUT_SHORT);
        history.back();
      } catch (e: any) {
        toastStore.pushToast("error", t("SettingsScreen.pinCode.error", undefined, { error: e.message }));
      }
    } else {
      vibrate();
      setPinError(t("SettingsScreen.pinCode.confirmationError"));
    }
  }

  const handleSubmit = async (pin: string) => {
    const step = currentStep();
    const handlers: Record<number, (pin: string) => void> = {
      1: handleFirstStep,
      2: handleSecondStep,
      3: handleThirdStep
    }

    handlers[step]?.(pin);
  }

  const handleStepBack = () => {
    if (currentStep() === 3) {
      setCurrentStep(2);
      setCurrentValue("");
    }
  }

  const handleProtectionRemove = async () => {
    try {
      await userService.setUpPinProtection(validCurrentPin());
      user.updateUserData({ hasPinProtection: 0 });
      toastStore.pushToast("success", t("SettingsScreen.pinCode.protectionRemoveSuccess"));
    } catch (e: any) {
      if (e.message) {
        toastStore.pushToast("error", t("SettingsScreen.pinCode.error", undefined, { error: e.message }));
      }
    } finally {
      history.back();
    }
  }

  return (
    <main>
      <ScreenHeader withGoBackButton title={t("SettingsScreen.pinCode.title")} />
      <VerticalScroll hasHeader hasBottomNavigation>
        <div class="flex flex-col gap-5">
          <div class="font-medium text-center mt-20">
            <Message>{`SettingsScreen.pinCode.steps.${currentStep()}`}</Message>
          </div>
          <PinInput
            value={currentValue}
            onChange={setCurrentValue}
            error={pinError()}
            onClearError={() => setPinError(null)}
            onSubmit={handleSubmit}
            loading={loading()}
          />
        </div>
        <div class="pt-10 font-semibold text-center">
          <Switch>
            <Match when={currentStep() === 2 && user.currentUser().data!.hasPinProtection}>
              <Button variant="transparent" onClick={handleProtectionRemove} class="gap-2 text-md text-red-500 dark:text-red-300">
                <FaSolidLockOpen />
                <Message>SettingsScreen.pinCode.removeProtection</Message>
              </Button>
            </Match>
            <Match when={currentStep() === 3}>
              <Button variant="ghost" onClick={handleStepBack} class="gap-2 text-md">
                <FaSolidChevronLeft />
                <Action>Back</Action>
              </Button>
            </Match>
          </Switch>
        </div>
      </VerticalScroll>
    </main>
  );
}

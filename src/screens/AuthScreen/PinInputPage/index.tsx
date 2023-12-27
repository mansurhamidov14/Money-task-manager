import { user } from "@app/stores";
import { Navigate } from "@solidjs/router";
import { Match, Show, Switch, createSignal } from "solid-js";
import { PinSetup } from "./PinSetup";
import { PinAuth } from "./PinAuth";
import { PasswordAuth } from "./PasswordAuth";

export function PinInputPage() {
  const [forgotPin, setForgotPin] = createSignal(false);

  return (
    <Switch>
      <Match when={user.currentUser().status === "unauthorized"}>
        <Navigate href="/auth" />
      </Match>
      <Match when={user.currentUser().status === "authorized"}>
        <Navigate href="/home" />
      </Match>
      <Match when={user.currentUser().status === "locked" && user.currentUser().data!.hasPinProtection}>
        <Show
          when={forgotPin()}
          fallback={<PinAuth onForgotPin={() => setForgotPin(true)} />}
        >
          <PasswordAuth onRememberPin={() => setForgotPin(false)} />
        </Show>
      </Match>
      <Match when={!user.currentUser().data!.hasPinProtection}>
        <PinSetup />
      </Match>
    </Switch>
  );
}

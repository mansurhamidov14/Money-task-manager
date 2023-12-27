import { user } from "@app/stores";
import { Navigate } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { PinSetup } from "./PinSetup";
import { PinAuth } from "./PinAuth";

export function PinInputPage() {
  return (
    <Switch>
      <Match when={user.currentUser().status === "unauthorized"}>
        <Navigate href="/auth" />
      </Match>
      <Match when={user.currentUser().status === "authorized"}>
        <Navigate href="/home" />
      </Match>
      <Match when={user.currentUser().status === "locked" && user.currentUser().data!.hasPinProtection}>
        <PinAuth />
      </Match>
      <Match when={!user.currentUser().data!.hasPinProtection}>
        <PinSetup />
      </Match>
    </Switch>
  );
}

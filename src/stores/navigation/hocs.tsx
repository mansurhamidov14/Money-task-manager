import { Component, Match, Switch } from "solid-js";
import { user } from "../user";
import { Navigate } from "@solidjs/router";

export function withProtectedRoute(Component: Component): Component {
  return () => (
    <Switch fallback={<Navigate href="/auth" />}>
      <Match when={user.currentUser().status === "authorized"}>
        <Component />
      </Match>
      <Match when={user.currentUser().status === "locked"}>
        <Navigate href="/auth/pin" />
      </Match>
    </Switch>
  );
}
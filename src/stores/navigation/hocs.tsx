import { Component, Match, Switch } from "solid-js";
import { user } from "../user";
import { Navigate } from "@solidjs/router";
import { DataProvider } from "..";

export function withProtectedRoute(Component: Component): Component {
  return () => (
    <Switch fallback={<Navigate href="/auth" />}>
      <Match when={user.currentUser().status === "authorized"}>
        <DataProvider>
          <Component />
        </DataProvider>
      </Match>
      <Match when={user.currentUser().status === "locked"}>
        <Navigate href="/auth/pin" />
      </Match>
    </Switch>
  );
}
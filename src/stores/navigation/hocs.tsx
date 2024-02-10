import { Navigate } from "@solidjs/router";
import { Component, Match, Switch } from "solid-js";
import { FIRST_RUN_STORE_KEY } from "@app/constants";
import { user } from "../user";
import { DataProvider } from "..";

export function withProtectedRoute(Component: Component): Component {
  const firstRunHappened = localStorage.getItem(FIRST_RUN_STORE_KEY);
  const fallbackPath = firstRunHappened ? "/auth" : "/auth/signup";

  return () => (
    <Switch fallback={<Navigate href={fallbackPath} />}>
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
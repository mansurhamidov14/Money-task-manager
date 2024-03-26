import { Navigate } from "@solidjs/router";
import { Component, Match, Switch } from "solid-js";
import { user } from "../user";
import { DataProvider } from "..";
import { firstRunHappened } from "@app/storage";

export function withProtectedRoute(Component: Component): Component {
  const fallbackPath = firstRunHappened.value ? "/auth" : "/auth/signup";

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
import { Component, Show } from "solid-js";
import { user } from "../user";
import { Navigate } from "@solidjs/router";

export function withProtectedRoute(Component: Component): Component {
  return () => (
    <Show when={user.currentUser().isAuthorized} fallback={<Navigate href="/auth" />}>
      <Component />
    </Show>
  );
}
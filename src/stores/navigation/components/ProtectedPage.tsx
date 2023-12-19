import { user } from "@app/stores";
import { Navigate } from "@solidjs/router";
import { ParentProps, Show } from "solid-js";

export function ProtectedPage(props: ParentProps) {
  return (
    <Show when={user.currentUser().isAuthorized} fallback={<Navigate href="/auth" />}>
      {props.children}
    </Show>
  );
}

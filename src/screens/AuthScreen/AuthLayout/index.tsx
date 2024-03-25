import { Navigate } from "@solidjs/router";
import { ParentProps, Show } from "solid-js";
import { logoDark, logoLight } from "@app/assets";
import { Header, VerticalScroll } from "@app/components";
import { themeStore, user } from "@app/stores";

const logos: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight
};

export function AuthLayout(props: ParentProps) {
  return (
    <Show
      when={user.currentUser().status !== "authorized"}
      fallback={<Navigate href="/home" />}
    >
      <VerticalScroll>
        <div class="pb-3">
          <Header />
          <div class="flex justify-center py-5 relative animate-slide-up">
            <img src={logos[themeStore.theme()]} class="w-[230px] h-auto" />
          </div>
          <div class="animate-fade-in">
            {props.children}
          </div>
        </div>
      </VerticalScroll>
    </Show>
  );
}

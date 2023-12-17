import { Loading } from "@app/components";
import { ParentProps, Show, createSignal, onCleanup, onMount } from "solid-js";

export function RerenderOnLangChange(props: ParentProps) {
  const [rerender, setRerender] = createSignal(false);

  const langChangeHandler = () => {
    setRerender(true);
    setTimeout(() => setRerender(false))
  };

  onMount(() => {
    window.addEventListener("appLanguageChange", langChangeHandler);
  });

  onCleanup(() => {
    window.removeEventListener("appLanguageChange", langChangeHandler);
  });

  return (
    <Show when={!rerender()} fallback={<Loading />}>
      {props.children}
    </Show>
  );
}

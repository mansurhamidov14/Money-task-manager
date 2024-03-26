import { Loading } from "@app/components";
import { appLang } from "@app/storage";
import { ParentProps, Show, createSignal, onCleanup, onMount } from "solid-js";

export function RerenderOnLangChange(props: ParentProps) {
  const [rerender, setRerender] = createSignal(false);

  const langChangeHandler = () => {
    setRerender(true);
    setTimeout(() => setRerender(false), 100);
  };

  onMount(() => {
    appLang.on("change", langChangeHandler);
  });

  onCleanup(() => {
    appLang.off("change", langChangeHandler);
  });

  return (
    <Show when={!rerender()} fallback={<Loading />}>
      {props.children}
    </Show>
  );
}

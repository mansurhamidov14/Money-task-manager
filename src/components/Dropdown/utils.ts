import { onCleanup } from "solid-js";

export function clickOutside(el: Element, accessor: any) {
  const onClick = (e: MouseEvent) => !el.contains((e as any).target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
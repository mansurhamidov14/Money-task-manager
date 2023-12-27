import { JSX } from "solid-js";

export type KeyProps<T> = {
  key: T;
  onClick?: (key: T) => void;
}

export function Key<T extends string | JSX.Element>(props: KeyProps<T>) {
  return (
    <button
      class="inline-flex h-[8vh] min-h-[3rem] aspect-square text-2xl justify-center items-center rounded-full bg-secondary-200 active:bg-secondary-300/80 dark:bg-gray-700 dark:active:bg-gray-700/50 font-medium"
      type="button"
      onClick={() => props.onClick?.(props.key)}
    >
      {props.key}
    </button>
  );
}

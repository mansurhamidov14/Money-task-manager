import { JSXElement, ParentProps } from "solid-js";

type EmptyListProps = {
  icon: JSXElement;
}

export function EmptyList({ children, icon }: ParentProps<EmptyListProps>)  {
  return (
    <div class="flex items-center gap-3 flex-col text-secondary-400 dark:text-secondary-300 py-5">
      <div class="text-5xl">{icon}</div>
      <div class="text-center">{children}</div>
    </div>
  );
}
import { JSX, Show, mergeProps } from "solid-js";
import "./style.css";

export type ListItemProps = {
  icon: JSX.Element;
  onClick?: () => void;
  title: JSX.Element;
  description?: JSX.Element;
  rightElement?: JSX.Element;
  size?: "sm" | "md" | "lg"
}


export function ListItem(_props: ListItemProps) {
  const props = mergeProps({ size: "md" }, _props);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    props.onClick?.();
  }

  return (
    <a href="#" onClick={handleClick}>
      <div class={`wfo-list-item ${props.size}`}>
        <div class="flex font-medium justify-between gap-3">
          <div class="rounded-lg aspect-square h-12 overflow-hidden">
            {props.icon}
          </div>
          <div class="flex-1 min-w-0 flex flex-col justify-center">
            <div class="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
              {props.title}
            </div>
            <Show when={props.description}>
              <div class="text-secondary-400 dark:text-secondary-300 font-normal text-sm mt-1">
                {props.description}
              </div>
            </Show>
          </div>
          <Show when={props.rightElement}>
            <div class="text-right flex flex-col justify-center">
              {props.rightElement}
            </div>
          </Show>
        </div>
      </div>
    </a>
  );
}

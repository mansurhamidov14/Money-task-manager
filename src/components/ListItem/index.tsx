import { For, JSX, Show, createSignal, mergeProps } from "solid-js";
import { Button, ButtonProps } from "..";
import "./style.css";
import { IconTypes } from "solid-icons";

type ListItemControl = {
  variant: ButtonProps["variant"];
  onClick: () => void;
  icon: IconTypes;
  label: string;
}

export type ListItemProps = {
  icon: JSX.Element;
  onClick?: () => void;
  title: JSX.Element;
  description?: JSX.Element;
  rightElement?: JSX.Element;
  size?: "sm" | "md" | "lg";
  controls?: ListItemControl[]; 
}


export function ListItem(_props: ListItemProps) {
  const [controlsVisibility, setControlsVisibility] = createSignal<"visible" | "hidden" | "hiding">("hidden");
  const props = mergeProps({ size: "md" }, _props);
  const handleClick = (e: MouseEvent) => {
    if (props.controls) {
      if (controlsVisibility() === "hidden") {
        setControlsVisibility("visible");
      } else {
        setControlsVisibility("hiding");
        setTimeout(() => setControlsVisibility("hidden"), 400);
      }
    }
    e.preventDefault();
    props.onClick?.();
  }

  return (
    <a href="#" class="relative overflow-hidden wfo-list-item-container" onClick={handleClick}>
      <div class={`wfo-list-item ${props.size}`}>
        <div class="flex flex-1 font-medium gap-3 min-w-0">
          <div class="rounded-lg aspect-square h-12 overflow-hidden">
            {props.icon}
          </div>
          <div class="flex-1 min-w-0 flex flex-col justify-center">
            <div class="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
              {props.title}
            </div>
            <Show when={props.description}>
              <div class="text-muted font-normal text-sm mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
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
        <Show when={props.controls}>
          <div class="wfo-list-item-controls" style={{ "--hover-width": `${3.5 * props.controls!.length}rem` }}>
            <For each={props.controls}>
              {Control => (
                <Button variant={Control.variant} square class="rounded-none h-full w-[3.5rem]" onClick={Control.onClick}>
                  <Control.icon size={24} title={Control.label} />
                </Button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </a>
  );
}

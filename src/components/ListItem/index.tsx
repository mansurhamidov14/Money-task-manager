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
    <a href="#" class="relative overflow-hidden" onClick={handleClick}>
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
              <div class="text-muted font-normal text-sm mt-1">
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
      <Show when={props.controls}>
        <div
          class="absolute right-0 top-0 h-full rounded-lg overflow-hidden flex"
          classList={{
            "animate-slide-left-in": controlsVisibility() === "visible",
            "animate-slide-right-out": controlsVisibility() === "hiding",
            "hidden": controlsVisibility() === "hidden"
          }}
        >
          <For each={props.controls}>
            {Control => (
              <Button variant={Control.variant} square class="h-full rounded-none w-14" onClick={Control.onClick}>
                <Control.icon size={24} title={Control.label} />
              </Button>
            )}
          </For>
        </div>
      </Show>
    </a>
  );
}

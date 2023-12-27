import { ParentProps } from "solid-js";

export type VerticalScrollProps = {
  hasBottomNavigation?: boolean;
  hasHeader?: boolean;
}

export function VerticalScroll(props: ParentProps<VerticalScrollProps>) {
  return (
    <div
      classList={{
        "overflow-y-auto": true,
        "pb-16": props.hasBottomNavigation,
        "h-[calc(100vh-4rem)]": props.hasHeader,
        "h-full": !props.hasHeader
      }}
    >
      {props.children}
    </div>
  );
}

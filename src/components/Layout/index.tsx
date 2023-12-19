import { ParentProps } from "solid-js";
import "./style.css"

export function Layout(props: ParentProps) {
  return (
    <div class={`app-layout`}>{props.children}</div>
  );
}
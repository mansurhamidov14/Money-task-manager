import { ParentProps } from "solid-js";
import "./style.css"

export function Layout(props: ParentProps) {
  return (
    <div class={`app-layout max-w-md mx-auto`}>{props.children}</div>
  );
}
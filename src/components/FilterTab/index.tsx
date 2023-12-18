import { ParentProps } from "solid-js";
import "./style.css";

export type FilterTabProps<T = any> = {
  active: boolean;
  id: T;
  onClick?: (event: MouseEvent) => any;
  onSwitch?: (id: T) => any;
}

export function FilterTab(props: ParentProps<FilterTabProps>) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    props.onClick?.(event);
    if (!props.active) {
      props.onSwitch?.(props.id);
    }
  }

  return (
    <a href="#" onClick={handleClick} classList={{ "filter-tab": true, active: props.active }}>
      {props.children}
    </a>
  );
}
import { ParentProps } from "solid-js";

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
    <a
      href="#"
      onClick={handleClick}
      classList={{
        "filter-tab inline-flex items-center rounded-3xl bg-white dark:bg-gray-700 px-3 py-1 text-sm whitespace-nowrap": true,
        "text-primary-500 shadow-md font-semibold": props.active,
        "shadow-sm text-secondary-400 dark:text-secondary-300 font-medium": !props.active
      }}
    >
      {props.children}
    </a>
  );
}
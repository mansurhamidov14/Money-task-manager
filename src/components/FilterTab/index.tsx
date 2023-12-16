import { ParentProps } from "solid-js";

export type FilterTabProps<T = any> = {
  active: () => boolean;
  id: T;
  onClick?: (event: MouseEvent) => any;
  onSwitch?: (id: T) => any;
}

export function FilterTab({ active, id, onClick, onSwitch, children }: ParentProps<FilterTabProps>) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onClick?.(event);
    if (!active()) {
      onSwitch?.(id);
    }
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      classList={{
        "filter-tab inline-flex items-center rounded-3xl bg-white dark:bg-gray-700 px-3 py-1 text-sm whitespace-nowrap": true,
        "text-primary-500 shadow-md font-semibold": active(),
        "shadow-sm text-secondary-400 dark:text-secondary-300 font-medium": !active()
      }}
    >
      {children}
    </a>
  );
}
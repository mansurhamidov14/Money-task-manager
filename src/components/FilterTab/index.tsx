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
        "filter-tab inline-flex items-center rounded-3xl bg-white px-3 py-1 text-xs whitespace-nowrap": true,
        "text-primary-500 shadow-md font-semibold": active(),
        "shadow-sm text-secondary-400 font-medium": !active()
      }}
    >
      {children}
    </a>
  );
}
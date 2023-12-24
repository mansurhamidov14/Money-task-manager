import { IconTypes } from "solid-icons"

export type ItemIconProps = {
  icon: IconTypes;
}

export function ItemIcon(Props: ItemIconProps) {
  return (
    <div class="flex h-full justify-center items-center text-2xl text-gray-500 dark:text-secondary-100">
      <Props.icon />
    </div>
  );
}

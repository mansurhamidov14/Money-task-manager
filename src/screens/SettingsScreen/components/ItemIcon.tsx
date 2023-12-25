import { IconTypes } from "solid-icons"
import { mergeProps } from "solid-js";

export type ItemIconProps = {
  icon: IconTypes;
  colorClass?: string;
}

export function ItemIcon(props: ItemIconProps) {
  const Props = mergeProps({ colorClass: "text-gray-500 dark:text-secondary-100" }, props);
  return (
    <div class={`flex h-full justify-center items-center ${Props.colorClass}`}>
      <Props.icon size={24} />
    </div>
  );
}

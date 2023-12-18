import { AiOutlinePlus } from "solid-icons/ai";

export function AddNewNavButton() {
  return (
    <li class="relative bottom-8 text-accent">
      <a href="#" class="flex justify-center items-center h-12 rounded-full bg-primary-800 dark:bg-primary-500 aspect-square text-3xl font-semibold text-white shadow-sm active:bg-primary-700">
        <AiOutlinePlus />
      </a>
    </li>
  );
}

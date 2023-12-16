import { JSXElement } from "solid-js";

export type BottomNavigationProps = {
  children: JSXElement[];
}

export function BottomNavigation(props: BottomNavigationProps) {
  return (
    <nav class="footer-nav text-secondary-500 dark:text-secondary-300 dark:bg-gray-700">
      <ul class="h-full flex justify-around items-center text-2xl">
        {props.children}
      </ul>
    </nav>
  );
}

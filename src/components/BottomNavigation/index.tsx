import { JSXElement } from "solid-js";

export type BottomNavigationProps = {
  children: JSXElement[];
}

export function BottomNavigation({ children }: BottomNavigationProps) {
  return (
    <nav class="footer-nav text-gray-500">
      <ul class="h-full flex justify-around items-center text-2xl">
        {children}
      </ul>
    </nav>
  );
}

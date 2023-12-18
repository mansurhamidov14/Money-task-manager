import { JSXElement } from "solid-js";
import "./style.css";

export type BottomNavigationProps = {
  children: JSXElement[];
}

export function BottomNavigation(props: BottomNavigationProps) {
  return (
    <nav class="footer-nav">
      <ul>
        {props.children}
      </ul>
    </nav>
  );
}

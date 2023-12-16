import { Link, Screen, navigation } from "@app/stores";
import { JSX } from "solid-js";

export type NavLinkProps = {
  screen: Screen;
  icon: JSX.Element
}

export function NavLink(props: NavLinkProps) {
  return (
    <li>
      <Link
        href={navigation.getNavLinkPath(props.screen)}
        screen="home"
        class={`nav-link${navigation.isScreenActive(props.screen) ? ' active' : ''}`}
      >
        {props.icon}
      </Link>
    </li>
  );
}

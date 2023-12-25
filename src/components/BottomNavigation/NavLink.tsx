import { Link, Screen, navigation } from "@app/stores";
import { JSX } from "solid-js";

export type NavLinkProps = {
  screen: Screen;
  icon: JSX.Element;
}

export function NavLink(props: NavLinkProps) {
  return (
    <Link
      href={navigation.getNavLinkPath(props.screen)}
      screen="home"
      class="nav-link"
    >
      {props.icon}
    </Link>
  );
}

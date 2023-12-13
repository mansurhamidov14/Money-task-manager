import { createMemo } from "solid-js";
import { FaSolidHouseChimney } from "solid-icons/fa";
import { Link, navigation } from "@app/stores";

export function HomeNavLink() {
  const href = createMemo(() => {
    return navigation.getNavLinkPath("home");
  });

  return (
    <li>
      <Link
        href={href()}
        screen="home"
        class={`nav-link${navigation.isScreenActive("home") ? ' active' : ''}`}
      >
        <FaSolidHouseChimney />
      </Link>
    </li>
  );
}

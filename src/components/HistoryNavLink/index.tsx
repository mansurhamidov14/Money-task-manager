import { FaSolidChartSimple } from "solid-icons/fa";
import { Link, navigation } from "@app/stores";
import { createMemo } from "solid-js";

export function HistoryNavLink() {
  const href = createMemo(() => {
    return navigation.getNavLinkPath("history");
  });

  return (
    <li>
      <Link
        href={href()}
        screen="history"
        class={`nav-link${navigation.isScreenActive("history") ? ' active' : ''}`}
      >
        <FaSolidChartSimple />
      </Link>
    </li>
  );
}

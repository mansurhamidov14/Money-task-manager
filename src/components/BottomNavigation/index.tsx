import { FaSolidChartSimple, FaSolidHouseChimney } from "solid-icons/fa";
import { NavLink } from "./NavLink";
import "./style.css";
import { NewItemButton } from "./NewItemButton";

export function BottomNavigation() {
  return (
    <nav class="bottom-nav group">
      <div class="grid-cols-3">
        <NavLink screen="home" icon={<FaSolidHouseChimney />} />
        <NewItemButton />
        <NavLink screen="history" icon={<FaSolidChartSimple />} />
      </div>
    </nav>
  );
}

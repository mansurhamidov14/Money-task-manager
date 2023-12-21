import { FaSolidChartSimple, FaSolidHouseChimney } from "solid-icons/fa";
import { NavLink } from "./NavLink";
import "./style.css";
import { CreateButton } from "./CreateButton";

export function BottomNavigation() {
  return (
    <nav class="bottom-nav group">
      <div class="grid-cols-3">
        <NavLink screen="home" icon={<FaSolidHouseChimney />} />
        <CreateButton />
        <NavLink screen="history" icon={<FaSolidChartSimple />} />
      </div>
    </nav>
  );
}

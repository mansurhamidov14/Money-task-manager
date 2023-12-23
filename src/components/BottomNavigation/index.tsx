import { FaSolidChartSimple, FaSolidHouseChimney } from "solid-icons/fa";
import { NavLink } from "./NavLink";
import "./style.css";
import { CreateButton } from "./CreateButton";
import { OcTasklist2 } from "solid-icons/oc";
import { VsSettings } from "solid-icons/vs";

export function BottomNavigation() {
  return (
    <nav class="bottom-nav group">
      <div class="grid-cols-5">
        <NavLink screen="home" icon={<FaSolidHouseChimney />} />
        <NavLink screen="history" icon={<FaSolidChartSimple />} />
        <CreateButton />
        <NavLink screen="tasks" icon={<OcTasklist2 />} />
        <NavLink screen="settings" icon={<VsSettings />} />
      </div>
    </nav>
  );
}

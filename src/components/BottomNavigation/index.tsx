import { t } from "@app/i18n";
import { FaSolidChartSimple, FaSolidHouseChimney } from "solid-icons/fa";
import { OcTasklist2 } from "solid-icons/oc";
import { VsSettings } from "solid-icons/vs";

import { CreateButton } from "./CreateButton";
import { NavLink } from "./NavLink";
import "./style.css";

export function BottomNavigation() {
  return (
    <nav class="bottom-nav group">
      <div class="grid-cols-5">
        <NavLink
          screen="home"
          icon={<FaSolidHouseChimney title={t("BottomNavigation.home")} size={24} />}
        />
        <NavLink
          screen="history"
          icon={<FaSolidChartSimple title={t("BottomNavigation.history")} size={24} />}
        />
        <CreateButton />
        <NavLink
          screen="tasks"
          icon={<OcTasklist2 title={t("BottomNavigation.tasks")} size={24} />}
        />
        <NavLink
          screen="settings"
          icon={<VsSettings title={t("BottomNavigation.settings")} size={24} />}
        />
      </div>
    </nav>
  );
}

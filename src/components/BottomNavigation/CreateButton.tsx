import { Message } from "@app/i18n";
import { Dropdown } from "../Dropdown";
import { TbReportMoney } from "solid-icons/tb";
import { CreateMenuItem } from "./CreateMenuItem";

export function CreateButton() {
  return (
    <div class="flex items-center justify-center relative">
      <Dropdown id="addMenu" horizontalPlacement="middle" hasOverlay>
        <Dropdown.ToggleButton class="create-button" unstyled>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
          <span class="sr-only">
            <Message>BottomNavigation.newItem</Message>
          </span>
        </Dropdown.ToggleButton>
        <Dropdown.Menu unstyled>
          <CreateMenuItem icon={<TbReportMoney />} title="Transaction" href="/new-transaction" />
          <CreateMenuItem icon={<TbReportMoney />} title="Todo" href="/new-transaction" />
          <CreateMenuItem icon={<TbReportMoney />} title="Brand" href="/new-transaction" />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
import { useAccounts } from "@app/hooks";
import { Message, t } from "@app/i18n";
import { FaSolidCreditCard, FaSolidMoneyBillTransfer } from "solid-icons/fa";
import { TbReportMoney } from "solid-icons/tb";
import { BiRegularTask } from "solid-icons/bi";
import { Show, createMemo } from "solid-js";

import { CreateMenuItem } from "./CreateMenuItem";
import { Dropdown, DropdownMenu, DropdownToggleButton } from "../Dropdown";

export function CreateButton() {
  const { accounts } = useAccounts();
  const canTransfer = createMemo(() => accounts().status === "success" && accounts().data!.length > 1);

  return (
    <div class="flex items-center justify-center relative">
      <Dropdown id="addMenu" horizontalPlacement="middle" hasOverlay>
        <DropdownToggleButton class="create-button" unstyled>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
          <span class="sr-only">
            <Message>BottomNavigation.create.title</Message>
          </span>
        </DropdownToggleButton>
        <DropdownMenu unstyled>
          <CreateMenuItem
            icon={<FaSolidCreditCard />}
            title={t("BottomNavigation.create.Items.account")}
            href="/new-account"
          />
          <CreateMenuItem
            icon={<TbReportMoney />}
            title={t("BottomNavigation.create.Items.transaction")}
            href="/new-transaction"
          />
          <CreateMenuItem
            icon={<BiRegularTask />}
            title={t("BottomNavigation.create.Items.task")}
            href="/new-task"
          />
          <Show when={canTransfer()}>
            <CreateMenuItem
              icon={<FaSolidMoneyBillTransfer />}
              title={t("BottomNavigation.create.Items.transfer")}
              href="/new-transfer"
            />
          </Show>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

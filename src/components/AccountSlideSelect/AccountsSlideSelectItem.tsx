import { skins } from "@app/constants"
import { currencyService } from "@app/services"
import { Account } from "@app/stores"

export type AccountsSlideSelectItemProps = {
  account: Account;
  onClick?: () => void;
}

export function AccountsSlideSelectItem(props: AccountsSlideSelectItemProps) {
  const handleClick = (e: Event) => {
    e.preventDefault();
    props.onClick?.();
  }

  return (
    <a href="#" class="px-2 pb-0.5" onClick={handleClick}>
      <div class="rounded-lg shadow bg-white dark:bg-gray-700 active:bg-white/70 dark:active:bg-gray-700/70 px-3 py-2">
        <div class="flex gap-3 items-center">
          <div>
            <img class="rounded h-[3rem] w-auto" src={skins[props.account.skin].image} />
          </div>
          <div>
            <div class="text-secondary-600 dark:text-secondary-300 text-sm">{props.account.title}</div>
            <div class="font-semibold text">
              {currencyService.formatValue(props.account.currency, props.account.balance)}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
import { Show } from "solid-js";
import { Button } from "../Button";
import { IoCloseOutline } from "solid-icons/io";

export type ScreenHeaderProps = {
  withGoBackButton?: boolean;
  title: string;
}

export function ScreenHeader(props: ScreenHeaderProps) {
  return (
    <div class="flex gap-3 h-16 content-center relative items-center border-b bg-white border-secondary-200/30 dark:bg-gray-900/40 px-2 shadow dark:border-gray-700">
      <Show when={props.withGoBackButton}>
        <Button class="absolute rounded-full" variant="glass" size="md" square onClick={() => history.back()}>
          <IoCloseOutline class="text-2xl" />
        </Button>
      </Show>
      <div class="text-xl font-bold flex-1 text-center">
        {props.title}
      </div>
    </div>
  )
}
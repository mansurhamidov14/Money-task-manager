import { JSX, Show } from "solid-js";
import { Button } from "../Button";
import { IoCloseOutline } from "solid-icons/io";

export type ScreenHeaderProps = {
  withGoBackButton?: boolean;
  title: JSX.Element;
  rightElement?: JSX.Element;
}

export function ScreenHeader(props: ScreenHeaderProps) {
  return (
    <div class="flex gap-3 h-14 content-center relative items-center border-b bg-white border-secondary-200/30 dark:bg-gray-900/40 px-2 shadow dark:border-gray-700">
      <Show when={props.withGoBackButton}>
        <Button class="absolute rounded-full" variant="transparent" size="md" square onClick={() => history.back()}>
          <IoCloseOutline class="text-2xl" />
        </Button>
      </Show>
      <div class="text-xl font-bold flex-1 flex justify-center items-center">
        {props.title}
      </div>
      <Show when={props.rightElement}>
        <div class="absolute right-2">
          {props.rightElement}
        </div>
      </Show>
    </div>
  )
}
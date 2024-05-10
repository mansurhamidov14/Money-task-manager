import { JSX, Show } from "solid-js";
import { FaSolidChevronLeft } from "solid-icons/fa";
import { Button } from "../Button";

export type ScreenHeaderProps = {
  withGoBackButton?: boolean;
  title: JSX.Element;
  rightElement?: JSX.Element;
}

export function ScreenHeader(props: ScreenHeaderProps) {
  return (
    <div class="screen-header flex gap-3 h-14 content-center relative items-center border-b bg-white border-secondary-200/30 dark:bg-gray-900/40 px-3 shadow dark:border-gray-700">
      <Show when={props.withGoBackButton}>
        <Button type="button" class="absolute" variant="transparent" size="sm" square onClick={() => history.back()}>
          <FaSolidChevronLeft size={20} />
        </Button>
      </Show>
      <div class="text-xl font-bold flex-1 flex justify-center items-center">
        {props.title}
      </div>
      <Show when={props.rightElement}>
        <div class="absolute right-3">
          {props.rightElement}
        </div>
      </Show>
    </div>
  );
}

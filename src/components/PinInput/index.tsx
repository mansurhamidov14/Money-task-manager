import { Accessor, For, Setter, createEffect, createMemo, onCleanup, onMount } from "solid-js";
import { Row } from "./Row";
import { Key } from "./Key";
import { IoBackspaceOutline } from "solid-icons/io";

const validPinLength = 6;
export type PinInputProps = {
  value: Accessor<string>;
  onChange: Setter<string>;
  onSubmit: (value: string) => void;
  error?: string | null;
  onClearError?: () => void;
  loading?: boolean;
}

export function PinInput(props: PinInputProps) {
  const keyDownHandler = (event: KeyboardEvent) => {
    if (isNaN(Number(event.key))) {
      return;
    }

    props.onChange(value => value + event.key)
  }

  onMount(() => {
    document.addEventListener("keydown", keyDownHandler);
  });

  onCleanup(() => {
    document.removeEventListener("keydown", keyDownHandler);
  })

  const handleNumberPress = (key: string) => {
    if (props.error && props.onClearError) {
      props.onClearError();
    }

    if (!props.loading && valueLength()  < validPinLength) {
      props.onChange(value => value + key);
    }
  }

  const handleErase = () => {
    if (props.value()) {
      props.onChange(value => value.slice(0, -1))
    }
  }

  const valueLength = createMemo(() => {
    return props.value().length;
  });

  createEffect(() => {
    if (valueLength() === validPinLength) {
      setTimeout(() => props.onSubmit(props.value()), 100);
    }
  });

  return (
    <div class="flex flex-col gap-6">
      <div>
        <div class="text-center text-sm text-red-600 dark:text-red-400 h-9 py-2">{props.error}</div>
        <div class="flex justify-center gap-3 relative" classList={{ "animate-bounce-x": Boolean(props.error) }}>
          <For each={Array(validPinLength)}>
            {(_, index) => (
              <div classList={{
                "w-4 h-4 rounded-full border border-gray-400/50 dark:border-gray-600 transition-[background] duration-500": true,
                "bg-gray-400/50 dark:bg-gray-600": index() < valueLength(),
                "border-red-400 dark:border-red-300": Boolean(props.error)
              }} />
            )}
          </For>
        </div>
      </div>
      <div class="flex flex-col gap-4" classList={{ "opacity-50": props.loading }}>
        <Row>
          <Key key="1" onClick={handleNumberPress} />
          <Key key="2" onClick={handleNumberPress} />
          <Key key="3" onClick={handleNumberPress} />
        </Row>
        <Row>
          <Key key="4" onClick={handleNumberPress} />
          <Key key="5" onClick={handleNumberPress} />
          <Key key="6" onClick={handleNumberPress} />
        </Row>
        <Row>
          <Key key="7" onClick={handleNumberPress} />
          <Key key="8" onClick={handleNumberPress} />
          <Key key="9" onClick={handleNumberPress} />
        </Row>
        <Row>
          <Key key="*" onClick={handleNumberPress} />
          <Key key="0" onClick={handleNumberPress} />
          <Key key={<IoBackspaceOutline />} onClick={handleErase} />
        </Row>
      </div>
    </div>
  );
}

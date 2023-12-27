import { Accessor, For, Setter, createEffect, createMemo } from "solid-js";
import { Row } from "./Row";
import { Key } from "./Key";
import { IoBackspaceOutline } from "solid-icons/io";

const validPinLength = 6;
export type PinKeyProps = {
  value: Accessor<string>;
  onChange: Setter<string>;
  onSubmit: (value: string) => void;
}

export function PinInput(props: PinKeyProps) {
  const handleNumberPress = (key: string) => {
    if (valueLength()  < validPinLength) {
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
  })

  return (
    <div class="flex flex-col gap-8">
      <div class="flex justify-center gap-3">
        <For each={Array(validPinLength)}>
          {(_, index) => (
            <div classList={{
              "w-4 h-4 rounded-full border border-gray-400/50 dark:border-gray-600 transition-[background] duration-500": true,
              "bg-gray-400/50 dark:bg-gray-600": index() < valueLength()
            }} />
          )}
        </For>
      </div>
      <div class="flex flex-col gap-4">
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

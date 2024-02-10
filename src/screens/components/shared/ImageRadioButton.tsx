import { AiFillCheckCircle } from "solid-icons/ai";
import { JSX, Show, splitProps } from "solid-js";

export type ImageRadioButtonProps = {
  img: string;
  fallbackColor?: string;
  imgClass?: string;
  textLabel?: JSX.Element;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

export function ImageRadioButton(props: ImageRadioButtonProps) {
  const [localProps, nativeProps] = splitProps(props, ["img", "fallbackColor", "imgClass", "textLabel"]);
  return (
    <>
      <input
        hidden
        type="radio"
        {...nativeProps}
      />
      <label
        classList={{
          "relative opacity-100": true,
          "opacity-50": !nativeProps.checked
        }}
        for={nativeProps.id}
      >
        <div
          class={localProps.imgClass}
          style={{
            "background-color": localProps.fallbackColor,
            "background-image": `url('${localProps.img}')`,
            "background-size": "cover"
          }}
        />
        <Show when={localProps.textLabel}>
          <div class="text-xs mt-0.5">{localProps.textLabel}</div>
        </Show>
      </label>
      <Show when={nativeProps.checked}>
        <div
          class="text-green-500 absolute top-0 left-0 w-full h-full flex justify-center items-center"
          classList={{ "pb-7": !!localProps.textLabel }}
        >
          <div class="bg-white rounded-full">
            <AiFillCheckCircle size={30} />
          </div>
        </div>
      </Show>
    </>
  );
}

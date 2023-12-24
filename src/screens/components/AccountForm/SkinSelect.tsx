import { Field } from "solid-form-handler";
import { InputProps } from "./types";
import { For, Show } from "solid-js";
import { skins } from "@app/constants";
import { Message } from "@app/i18n";
import { AiFillCheckCircle } from "solid-icons/ai";

export function SkinSelect(props: InputProps) {
  return (
    <Field
      mode="radio-group"
      name="skin"
      formHandler={props.formHandler}
      render={(field) => (
        <div class="-mx-5">
          <div class="overflow-x-auto w-full pb-4 px-5">
            <div class="grid grid-rows-3 grid-flow-col w-fit gap-3" style="grid-template-rows: auto auto;">
              <For each={skins}>
                {(skin, index) => (
                  <div class="w-[8rem] relative">
                    <input
                      hidden
                      {...field.props}
                      checked={field.helpers.isChecked(index())}
                      class="form-check-input"
                      classList={{
                        'is-invalid': field.helpers.error,
                      }}
                      id={`${field.props.id}-${index()}`}
                      value={index()}
                      type="radio"
                    />
                    <label
                      classList={{
                        "relative opacity-100": true,
                        "opacity-50": !field.helpers.isChecked(index())
                      }}
                      for={`${field.props.id}-${index()}`}
                    >
                      <img class="w-full rounded-md" src={skin.image} />
                      <span class="text-xs">
                        <Message>{`NewAccountScreen.FormFields.skins.${index()}`}</Message>
                      </span>
                    </label>
                    <Show when={field.helpers.isChecked(index())}>
                      <div class="text-green-500 absolute top-0 left-0 w-full h-full flex justify-center items-center text-4xl pb-7">
                        <div class="bg-white rounded-full">
                          <AiFillCheckCircle />
                        </div>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      )}
    />
  );
}

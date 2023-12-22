import { Field } from "solid-form-handler";
import { InputProps } from "./types";
import { For } from "solid-js";
import { skins } from "@app/constants";

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
                  <div class="w-[8rem]">
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
                    <label for={`${field.props.id}-${index()}`}>
                      <img
                        classList={{
                          "w-full opacity-100 rounded-md": true,
                          "opacity-50": !field.helpers.isChecked(index())
                        }}
                        src={skin.image}
                      />
                    </label>
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

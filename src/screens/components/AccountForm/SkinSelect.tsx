import { Field } from "solid-form-handler";
import { For } from "solid-js";
import { skins } from "@app/constants";
import { Message } from "@app/i18n";
import { InputProps } from "./types";
import { ImageRadioButton } from "../ImageRadioButton";

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
                    <ImageRadioButton
                      {...field.props}
                      id={`${field.props.id}-${index()}`}
                      img={skin.image}
                      imgClass="w-full rounded-md"
                      checked={field.helpers.isChecked(index())}
                      textLabel={<Message>{`NewAccountScreen.FormFields.skins.${index()}`}</Message>}
                      value={index()}
                    />
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

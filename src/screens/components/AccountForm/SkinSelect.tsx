import { Message } from "@app/i18n";
import { skinService } from "@app/services";
import { Field } from "solid-form-handler";
import { For } from "solid-js";
import { ImageRadioButton, InputProps } from "../shared";

export function SkinSelect(props: InputProps) {
  return (
    <Field
      mode="radio-group"
      name="skin"
      formHandler={props.formHandler}
      render={(field) => (
        <div class="-mx-5">
          <div class="overflow-x-auto w-full pb-1 mb-2 px-5">
            <div class="grid grid-rows-3 grid-flow-col w-fit gap-3" style="grid-template-rows: auto auto;">
              <For each={skinService.skins}>
                {(skin, index) => (
                  <div class="w-[8rem] relative">
                    <ImageRadioButton
                      {...field.props}
                      id={`${field.props.id}-${index()}`}
                      img={skin.image}
                      imgClass="w-full rounded-md aspect-[100/64]"
                      checked={field.helpers.isChecked(skin.id)}
                      textLabel={<Message>{`NewAccountScreen.FormFields.skins.${skin.id}`}</Message>}
                      value={String(skin.id)}
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

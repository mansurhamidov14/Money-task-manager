import { For, createSignal } from "solid-js";
import { Button, ScreenHeader, VerticalScroll } from "@app/components";
import { Action, t } from "@app/i18n";
import { ImageRadioButton } from "@app/screens/components/ImageRadioButton";
import { user } from "@app/stores";
import { avatars } from "../../constants";
import { userService } from "@app/services";

export function ChangeAvatarScreen() {
  const currentUser = user.currentUser().data!;
  const [selectedAvatar, setSelectedAvatar] = createSignal<string>(currentUser.avatar || avatars[0]);
  const saveAvatar = async () => {
    const avatar = selectedAvatar();
    await userService.update(currentUser.id, { avatar });
    user.updateUserData({ avatar });
    history.back();
  }

  return (
    <main>
      <ScreenHeader
        withGoBackButton
        title={t("SettingsScreen.changeAvatar")}
      />
      <VerticalScroll hasBottomNavigation hasHeader>
        <div class="flex py-3 flex-col items-center gap-3">
          <img src={selectedAvatar()} class="max-w-full rounded-full" />
        </div>
        <div class="px-5 py-4">
          <div class="-mx-5">
            <div class="overflow-x-auto w-full pb-4 px-5">
              <div class="grid grid-flow-col w-fit gap-5" style="grid-template-rows: auto auto auto;">
                <For each={avatars}>
                  {avatar => (
                    <div class="relative w-[5rem]">
                      <ImageRadioButton
                        id={avatar}
                        img={avatar}
                        checked={selectedAvatar() === avatar}
                        onChange={() => setSelectedAvatar(avatar)}
                        imgClass="w-full rounded-full"
                      />
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
        <div class="px-5 pt-3">
          <Button type="button" full onClick={saveAvatar}>
            <Action>Save</Action>
          </Button>
        </div>
      </VerticalScroll>
    </main>
  );
}
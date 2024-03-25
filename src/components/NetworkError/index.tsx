import { RiDeviceSignalWifiErrorLine } from "solid-icons/ri";
import { Button, Header } from "..";
import { Translate } from "@app/i18n";
import { IoRefresh } from "solid-icons/io";

export function NetworkError(props: { onTryAgain: () => void }) {
  return (
    <div class="h-[100svh] bg-secondary-100 dark:bg-gray-800">
      <div class="h-full max-w-5xl mx-auto flex justify-between flex-col">
        <Header />
        <div class="text-center flex flex-col items-center">
          <RiDeviceSignalWifiErrorLine size={72} />
          <p class="mt-5 px-5">
            <Translate ns="Exceptions">NetworkError</Translate>
          </p>
        </div>
        <div class="flex justify-center pb-8">
          <div class="min-w-[200px]">
            <Button full onClick={props.onTryAgain}>
              <IoRefresh size={18} class="mr-1" />
              <Translate ns="Actions">TryAgain</Translate>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

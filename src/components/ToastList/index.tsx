import { For } from "solid-js";
import { toastStore } from "@app/stores";
import { Toast } from "../Toast";

export function ToastList() {
  return (
    <div class="fixed w-full top-0 flex flex-col-reverse gap-3 pt-2 px-3 z-50">
      <For each={toastStore.toasts()}>
        {toast => (
          <Toast
            id={toast.id}
            class={toast.isClosing ? "animate-slide-up-out" : undefined}
            title={toast.title}
            variant={toast.variant}
            text={toast.text}
            closable={toast.closable}
            onClose={toast.closable ? () => toastStore.closeToast(toast) : undefined}
          />
        )}
      </For>
    </div>
    
  )
}
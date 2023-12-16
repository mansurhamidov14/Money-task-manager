import { createRoot, createSignal } from "solid-js";
import { ToastData } from "./types";
import { ToastVariant } from "@app/components";
import { t } from "@app/i18n";

function initToastStore() {
  const [toasts, setToasts] = createSignal<ToastData[]>([]);

  const pushToast = (
    type: ToastVariant,
    text: string,
    title: string | null = null,
    autocloseTimeout: number | null = 5000,
    closable = true
  ) => {
    const id = `toast-${Date.now()}`;
    const toastTitle = title ?? t(`Toasts.${type}`);
    const closeTimeout = autocloseTimeout
      ? setTimeout(() => setToasts(toasts().filter(t => t.id !== id)), autocloseTimeout)
      : undefined;
    setToasts([
      ...toasts(),
      {
        id,
        variant: type,
        title: toastTitle,
        text: text,
        closable,
        closeTimeout
      }
    ]);
  }

  const closeToast = (toast: ToastData) => {
    if (toast.closable) {
      setToasts(toasts().filter(t => t.id !== toast.id));
      if (toast.closeTimeout) {
        clearTimeout(toast.closeTimeout);
      }
    }
  }

  return { toasts, pushToast, closeToast };
}

export const toastStore = createRoot(initToastStore);

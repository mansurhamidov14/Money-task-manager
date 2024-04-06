import { createRoot, createSignal } from "solid-js";
import { ToastData } from "./types";
import { ToastVariant } from "@app/components";
import { t } from "@app/i18n";
import { HttpStatus } from "@app/services";

function initToastStore() {
  const TIMEOUT_SHORT = 1000;
  const TIMEOUT_MEDIUM = 3000;
  const TIMEOUT_LONG = 6000;
  const [toasts, setToasts] = createSignal<ToastData[]>([]);

  const pushToast = (
    type: ToastVariant,
    text: string,
    title: string | null = null,
    autocloseTimeout: number | null = TIMEOUT_MEDIUM,
    closable = true
  ) => {
    const id = `toast-${Date.now()}`;
    const toastTitle = title ?? t(`Toasts.${type}`);
    const closeTimeout = autocloseTimeout
      ? putToClosingState(id, autocloseTimeout)
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

  const handleServerError = (error: { message?: string, status?: number }) => {
    if (error.message && error.status !== HttpStatus.UNAUTHORIZED) {
      pushToast("error", t(error.message, "Exceptions"));
    }
  }

  const putToClosingState = (toastId: string | number, timeoutMs: number) => {
    return setTimeout(() => {
      setToasts(toasts().map(t => {
        if (t.id !== toastId) return t;
        return { ...t, isClosing: true }
      }));

      setTimeout(() => setToasts(toasts().filter(t => t.id !== toastId)), 400)
    }, timeoutMs);
  }

  const closeToast = (toast: ToastData) => {
    if (toast.closable) {
      setToasts(toasts().filter(t => t.id !== toast.id));
      if (toast.closeTimeout) {
        clearTimeout(toast.closeTimeout);
      }
    }
  }

  return {
    toasts,
    pushToast,
    handleServerError,
    closeToast,
    TIMEOUT_SHORT,
    TIMEOUT_MEDIUM,
    TIMEOUT_LONG
  };
}

export const toastStore = createRoot(initToastStore);

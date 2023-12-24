import { createMemo, createRoot, createSignal } from "solid-js";
import { ConfirmationRequest } from "./types";
import { t } from "@app/i18n";

function initConfirmationStore() {
  const [confirmationRequest, setConfirmationRequest] = createSignal<Required<ConfirmationRequest> | null>(null);

  const confirmationRequested = createMemo(() => Boolean(confirmationRequest()));

  const requestConfirmation = (data: ConfirmationRequest) => {
    setConfirmationRequest({
      title: data.title ?? t("ConfirmationRequest.defaults.title"),
      text: data.text ?? "",
      onConfirm: data.onConfirm,
      onCancel: data.onCancel ?? (() => undefined),
      confirmButton: {
        label: data.confirmButton?.label ?? t("ConfirmationRequest.defaults.confirm"),
        variant: data.confirmButton?.variant ?? "danger"
      },
      cancelButton: {
        label: data.cancelButton?.label ?? t("ConfirmationRequest.defaults.cancel"),
        variant: data.cancelButton?.variant ?? "secondary"
      }
    });
  }

  const cancel = () => {
    confirmationRequest()?.onCancel();
    setConfirmationRequest(null);
  }

  const confirm = () => {
    confirmationRequest()?.onConfirm();
    setConfirmationRequest(null);
  }

  return {
    confirmationRequest,
    confirmationRequested,
    requestConfirmation,
    confirm,
    cancel,
  };
}

export const confirmationStore = createRoot(initConfirmationStore);

// @ts-ignore
window.confirmationStore = confirmationStore;

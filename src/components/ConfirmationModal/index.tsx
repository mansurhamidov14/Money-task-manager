import { Show } from "solid-js";
import { confirmationStore } from "@app/stores";
import { Button } from "../Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../Modal";

export function ConfirmationModal() {
  const {
    confirmationRequest,
    confirmationRequested,
    confirm,
    cancel
  } = confirmationStore;
  
  return (
    <Modal isOpen={confirmationRequested()} onClose={cancel}>
      <ModalHeader>
        <h3 class="text-xl font-bold dark:text-white">
          {confirmationRequest()?.title}
        </h3>
      </ModalHeader>
      <Show when={confirmationRequest()?.text}>
        <ModalBody>
          <p class="text-secondary-700 dark:text-secondary-300">
            {confirmationRequest()!.text}
          </p>
        </ModalBody>
      </Show>
      <Show when={confirmationRequested()}>
        <ModalFooter>
          <Button onClick={confirm} variant={confirmationRequest()?.confirmButton.variant as any}>
            {confirmationRequest()?.confirmButton.label}
          </Button>
          <Button onClick={cancel} variant={confirmationRequest()?.cancelButton.variant as any}>
            {confirmationRequest()?.cancelButton.label}
          </Button>
        </ModalFooter>
      </Show>
    </Modal>
  );
}

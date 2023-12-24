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
        <h3 class="text-xl font-bold">
          {confirmationRequest()?.title}
        </h3>
      </ModalHeader>
      <ModalBody>
        <p class="text-secondary-600">
          {confirmationRequest()?.description}
        </p>
      </ModalBody>
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

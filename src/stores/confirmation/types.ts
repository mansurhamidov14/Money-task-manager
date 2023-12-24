import { ButtonProps } from "@app/components";

export type ConfirmationRequest = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButton?: ConfirmationAction;
  cancelButton?: ConfirmationAction;
}

type ConfirmationAction = {
  variant?: ButtonProps["variant"];
  label?: string;
}
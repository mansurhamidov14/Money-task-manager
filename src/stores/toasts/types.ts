import { ToastVariant } from "@app/components";

export type ToastData = {
  id: string;
  variant: ToastVariant;
  title: string;
  text: string;
  closeTimeout?: NodeJS.Timeout;
  closable: boolean;
  isClosing?: boolean;
}

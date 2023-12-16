import { t } from "@app/i18n";
import {
  FaSolidCircleCheck as IconSuccess,
  FaSolidCircleExclamation as IconWarning,
  FaSolidCircleInfo as IconInfo,
  FaSolidCircleXmark as IconError
} from "solid-icons/fa";
import { IoCloseOutline } from "solid-icons/io";
import { JSX, Show, createMemo } from "solid-js";

import "./style.css";

export type ToastVariant = "error" | "success" | "warning" | "info"
export type ToastProps = {
  id: string | number;
  closable?: boolean;
  onClose?: () => void;
  variant: ToastVariant,
  title: string;
  text: JSX.Element;
}

export function Toast(props: ToastProps) {
  const getRenderData = createMemo(() => {
    switch(props.variant) {
      case "error":
        return {
          icon: <IconError class="text-red-500 dark:text-red-400" />,
          lineColor: "bg-red-500 dark:bg-red-400",
          textColor: "dark:text-red-200 text-red-700",
          titleColor: "dark:text-red-100 text-red-900"
        }
      case "success":
        return {
          icon: <IconSuccess class="text-green-500 dark:text-green-400" />,
          lineColor: "bg-green-500 dark:bg-green-400",
          textColor: "dark:text-green-200 text-green-700",
          titleColor: "dark:text-green-100 text-green-900"
        }
      case "warning":
        return {
          icon: <IconWarning class="text-yellow-500 dark:text-yellow-300" />,
          lineColor: "bg-yellow-500 dark:bg-yellow-300",
          textColor: "dark:text-yellow-100 text-yellow-600",
          titleColor: "dark:text-yellow-50 text-yellow-800"
        }
      case "info":
      default:
        return {
          icon: <IconInfo class="text-blue-500 dark:text-blue-400" />,
          lineColor: "bg-blue-500 dark:bg-blue-400",
          textColor: "dark:text-blue-200 text-blue-700",
          titleColor: "dark:text-blue-100 text-blue-900"
        }
    }
  });

  return (
    <div id={String(props.id)} class="toast flex flex-wrap relative gap-3 pr-3 w-full max-w-sm bg-white rounded-lg overflow-hidden shadow dark:bg-gray-700/30 dark:backdrop-blur mx-auto translate-y-0 duration-500">
      <div class={`w-[0.5em] ${getRenderData().lineColor}`}/>
      <div class="text-4xl flex items-center" style="flex 0 0 auto;">{getRenderData().icon}</div>
      <div class="pl-1 pr-3 py-2 w-[calc(100%-4.25em)]">
        <div class={`font-semibold flex-grow-0 text-lg ${getRenderData().titleColor}`}>{props.title}</div>
        <div class={getRenderData().textColor}>{props.text}</div>
      </div>
      <Show when={props.closable && props.onClose}>
        <button onClick={() => props.onClose?.()} type="button" class="absolute right-2 top-2 justify-center items-center text-gray-400 hover:text-gray-900 rounded-lg p-0.5 hover:bg-gray-100 inline-flex h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label={t("Close", "Actions")}>
          <span class="sr-only">
            {t("Close", "Actions")}
          </span>
          <IoCloseOutline />
        </button>
      </Show>
    </div>
  );
}
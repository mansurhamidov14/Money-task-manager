import { splitProps } from "solid-js";
import { t } from "../index";
import { TrComponentProps } from "../types";

export function Action(props: TrComponentProps) {
  const [localProps, forwardedProps] = splitProps(props, ["children"]);
  return <>{t(localProps.children, "Actions", forwardedProps)}</>;
}

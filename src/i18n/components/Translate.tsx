import { splitProps } from "solid-js";
import { t } from "../index";
import { TrComponentProps } from "../types";

export function Translate(props: TrComponentProps) {
  const [localProps, forwardedProps] = splitProps(props, ["children", "ns"]);
  return <>{t(localProps.children, localProps.ns, forwardedProps)}</>;
}

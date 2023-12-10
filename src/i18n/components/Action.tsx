import { t } from "../index";
import { TrComponentProps } from "../types";

export function Action({ children, ...params }: TrComponentProps) {
  return t(children, "Actions", params);
}
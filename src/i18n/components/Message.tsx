import { t } from "../index";
import { TrComponentProps } from "../types";

export function Message({ children, ...params }: TrComponentProps) {
  return t(children, "Messages", params);
}
import { TrComponentProps } from "../types";
import { Translate } from "./Translate";

export * from "./RerenderOnLangChange";

export { Translate };
export const Action = (props: TrComponentProps) => <Translate ns="Actions" {...props} />
export const Message = (props: TrComponentProps) => <Translate ns="Messages" {...props} />
export const Exception = (props: TrComponentProps) => <Translate ns="Exceptions" {...props} />

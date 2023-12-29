import { JSX, ParentProps, Show, mergeProps } from "solid-js";
import { AsyncStore } from "./types"
import { Loading } from "@app/components";

type AwaitProps = {
  for: AsyncStore<any>[] | any[];
  fallback?: JSX.Element;
}

export function Await(props: ParentProps<AwaitProps>) {
  const finalProps = mergeProps({ fallback: <Loading /> }, props);
  return (
    <Show
      when={finalProps.for.every(data => data?.status ? data.status === "success" : data)}
      fallback={finalProps.fallback}
    >
      {props.children}
    </Show>
  );
}

import { JSXElement } from "solid-js"

export type SectionTitleProps = {
  children: JSXElement;
}

export function SectionTitle(props: SectionTitleProps) {
  return (
    <h3 class="text-xl font-bold pt-3">{props.children}</h3>
  );
}

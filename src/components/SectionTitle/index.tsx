import { JSXElement } from "solid-js"

export type SectionTitleProps = {
  children: JSXElement;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 class="text-xl font-bold py-3">{children}</h3>
  );
}

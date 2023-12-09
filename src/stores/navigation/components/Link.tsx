import { A, AnchorProps, useNavigate } from "@solidjs/router";
import { navigation } from "../index";
import { Screen } from "../types";
import { createMemo } from "solid-js";

export interface LinkProps extends AnchorProps {
  screen?: Screen;
}

export function Link(props: LinkProps) {
  const _navigate = useNavigate();
  const navigate = (event: MouseEvent) => {
    event.preventDefault();
    _navigate(props.href);
    const _screen = props.screen ?? navigation.currentScreen();
    navigation.navigate(props.href, _screen);
  };

  return (
    <A onClick={navigate} {...props} />
  );
}

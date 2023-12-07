import { AiFillHome, AiOutlineHome } from "solid-icons/ai";

export type HomeNavLinkProps = {
  active?: boolean;
}

export function HomeNavLink({ active }: HomeNavLinkProps) {
  return (
    <li>
      <a href="#" classList={{ active, 'nav-link': true }}>
        {active ?  <AiFillHome /> : <AiOutlineHome />}
      </a>
    </li>
  );
}

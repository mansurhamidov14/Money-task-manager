import { HiOutlineUser, HiSolidUser } from "solid-icons/hi";

export type AccountNavLinkProps = {
  active?: boolean;
}

export function AccountNavLink({ active }: AccountNavLinkProps) {
  return (
    <li>
      <a href="#" classList={{ active, 'nav-link': true }}>
        {active ?  <HiSolidUser /> : <HiOutlineUser />}
      </a>
    </li>
  );
}

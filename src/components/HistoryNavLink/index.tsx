import { HiOutlineChartBarSquare, HiSolidChartBarSquare } from "solid-icons/hi";

export type HistoryNavLinkProps = {
  active?: boolean;
}

export function HistoryNavLink({ active }: HistoryNavLinkProps) {
  return (
    <li>
      <a href="#" classList={{ active, 'nav-link': true }}>
        {active ?  <HiSolidChartBarSquare /> : <HiOutlineChartBarSquare />}
      </a>
    </li>
  );
}

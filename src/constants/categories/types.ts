import type { IconTypes } from "solid-icons";

export type CategoryId =
  | "market"
  | "utility"
  | "education"
  | "entertainment"
  | "health"
  | "beauty"
  | "clothing"
  | "electronics"
  | "restaurant"
  | "transfer"
  | "transport"
  | "travel"
  | "other";

export type Category = {
  id: CategoryId,
  icon: IconTypes,
  colors: {
    accent: string;
    icon: string;
  }
}

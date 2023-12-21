import { blueCard, greenCard, yellowCard } from "@app/assets";
import { Skin } from "./types";

export const skins: Record<number, Skin> = {
  1: {
    id: 1,
    image: yellowCard,
    primaryTextColor: "#92400e",
    secondaryTextColor: "#a16207",
    balancePlacement: "right-10 top-[32%]"
  },
  2: {
    id: 2,
    image: greenCard,
    primaryTextColor: "#f0fdf4",
    secondaryTextColor: "#bbf7d0",
    balancePlacement: "right-10 top-[30%]"
  },
  3: {
    id: 3,
    image: blueCard,
    primaryTextColor: "#f8fafc",
    secondaryTextColor: "#bfdbfe",
    balancePlacement: "right-left top-1/3"
  }
};

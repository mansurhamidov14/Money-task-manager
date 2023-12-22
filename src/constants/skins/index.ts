import { blackCard, blueCard, giftCard, greenCard, lightPinkCard, piggyBankCard, pinkCard, spaceCard, travelCard, yellowCard } from "@app/assets";
import { Skin } from "./types";

export const skins: Record<number, Skin> = {
  1: {
    id: 1,
    image: yellowCard,
    primaryTextColor: "#92400e",
    secondaryTextColor: "#92400e",
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
  },
  4: {
    id: 4,
    image: pinkCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[30%]"
  },
  5: {
    id: 5,
    image: lightPinkCard,
    primaryTextColor: "#BD8749",
    secondaryTextColor: "rgba(189, 135, 73, 0.8)",
    balancePlacement: "right-10 top-[30%]"
  },
  6: {
    id: 6,
    image: blackCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[30%]"
  },
  7: {
    id: 7,
    image: travelCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  8: {
    id: 8,
    image: giftCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  9: {
    id: 9,
    image: piggyBankCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  10: {
    id: 10,
    image: spaceCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[32%]"
  }
};

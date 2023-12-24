import {
  arsenalCard,
  blackCard,
  blueCard,
  giftCard,
  greenCard,
  juventusCard,
  lightPinkCard,
  piggyBankCard,
  pinkCard,
  redPlanetCard,
  spaceCard,
  travelCard,
  yellowCard
} from "@app/assets";
import { Skin } from "./types";

export const skins: Skin[] = [
  {
    image: yellowCard,
    color: "#fdb004",
    primaryTextColor: "#92400e",
    secondaryTextColor: "#92400e",
    balancePlacement: "right-10 top-[32%]"
  },
  {
    image: greenCard,
    primaryTextColor: "#f0fdf4",
    secondaryTextColor: "#bbf7d0",
    color: "#066b48",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: blueCard,
    primaryTextColor: "#f8fafc",
    secondaryTextColor: "#bfdbfe",
    color: "#026698",
    balancePlacement: "right-left top-1/3"
  },
  {
    image: pinkCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    color: "#c51765",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: lightPinkCard,
    color: "#FFC4DE",
    primaryTextColor: "#BD8749",
    secondaryTextColor: "rgba(189, 135, 73, 0.8)",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: blackCard,
    color: "#2A2A2C",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: travelCard,
    color: "#7d7353",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  {
    image: giftCard,
    color: "#243740",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  {
    image: piggyBankCard,
    color: "#7c6053",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  {
    image: spaceCard,
    color: "#4a394e",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: redPlanetCard,
    color: "#621c11",
    primaryTextColor: "rgba(255, 255, 255, .8)",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: juventusCard,
    color: "#010505",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .9)",
    balancePlacement: "right-10 top-[30%]"
  },
  {
    image: arsenalCard,
    color: "#49130e",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  }
];

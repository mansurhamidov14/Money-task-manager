import {
  abbTamCard,
  albaliCard,
  albaliPlusCard,
  arsenalCard,
  birbankCard,
  blackCard,
  blueCard,
  giftCard,
  greenCard,
  juventusCard,
  lightPinkCard,
  monobankCard,
  oschadBankCard,
  piggyBankCard,
  pinkCard,
  privatUniversalCard,
  rabitaKartmaneCard,
  redCard,
  redPlanetCard,
  spaceCard,
  travelCard,
  unibankUcard,
  yellowCard
} from "@app/assets";
import { Skin } from "./types";

export const skins: Record<string, Skin> = {
  yellow: {
    image: yellowCard,
    color: "#fdb004",
    primaryTextColor: "#92400e",
    secondaryTextColor: "#92400e",
    balancePlacement: "right-10 top-[32%]"
  },
  green: {
    image: greenCard,
    primaryTextColor: "#f0fdf4",
    secondaryTextColor: "#bbf7d0",
    color: "#066b48",
    balancePlacement: "right-10 top-[30%]"
  },
  blue: {
    image: blueCard,
    primaryTextColor: "#f8fafc",
    secondaryTextColor: "#bfdbfe",
    color: "#026698",
    balancePlacement: "right-left top-1/3"
  },
  pink: {
    image: pinkCard,
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    color: "#c51765",
    balancePlacement: "right-10 top-[30%]"
  },
  lightPink: {
    image: lightPinkCard,
    color: "#FFC4DE",
    primaryTextColor: "#BD8749",
    secondaryTextColor: "rgba(189, 135, 73, 0.8)",
    balancePlacement: "right-10 top-[30%]"
  },
  red: {
    image: redCard,
    color: "#bf0303",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[30%]"
  },
  black: {
    image: blackCard,
    color: "#2A2A2C",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[30%]"
  },
  travel: {
    image: travelCard,
    color: "#7d7353",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  gift: {
    image: giftCard,
    color: "#243740",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  piggy: {
    image: piggyBankCard,
    color: "#7c6053",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "right-10 top-[32%]"
  },
  space: {
    image: spaceCard,
    color: "#4a394e",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  },
  redPlanet: {
    image: redPlanetCard,
    color: "#621c11",
    primaryTextColor: "rgba(255, 255, 255, .8)",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  },
  abbTam: {
    image: abbTamCard,
    color: "#556772",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "#FFFFFF",
    balancePlacement: "left-[27%] top-[31%]",
    hideAccountTitle: true
  },
  birbank: {
    image: birbankCard,
    color: "#353132",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .9)",
    balancePlacement: "right-16 top-[35%]",
    hideAccountTitle: true,
  },
  rabitaKartmane: {
    image: rabitaKartmaneCard,
    color: "#309838",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .9)",
    balancePlacement: "right-14 top-[28%]",
    hideAccountTitle: true,
  },
  albali: {
    image: albaliCard,
    color: "#36220c",
    primaryTextColor: "rgba(255, 255, 255, .8)",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-14 top-[24%]",
    hideAccountTitle: true
  },
  albaliPlus: {
    image: albaliPlusCard,
    color: "#450f42",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .9)",
    balancePlacement: "right-14 top-[24%]",
    hideAccountTitle: true
  },
  ucard: {
    image: unibankUcard,
    color: "#e2a532",
    primaryTextColor: "rgba(0, 0, 0, .3)",
    secondaryTextColor: "rgba(0, 0, 0, .4)",
    balancePlacement: "left-4 top-[30%]",
    hideAccountTitle: true
  },
  monobank: {
    image: monobankCard,
    color: "#141414",
    primaryTextColor: "rgba(255, 255, 255, .7)",
    secondaryTextColor: "rgba(255, 255, 255, .6)",
    balancePlacement: "left-[29%] top-[32%]",
    hideAccountTitle: true,
  },
  oschadbank: {
    image: oschadBankCard,
    color: "#FEED00",
    primaryTextColor: "#000000",
    secondaryTextColor: "#000000",
    balancePlacement: "right-6 top-[32%]",
    hideAccountTitle: true,
  },
  privatUniversal: {
    image: privatUniversalCard,
    color: "#144BA6",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "#FFFFFF",
    balancePlacement: "right-6 top-[32%]",
    hideAccountTitle: true,
  },
  juventus: {
    image: juventusCard,
    color: "#010505",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .9)",
    balancePlacement: "right-10 top-[30%]"
  },
  arsenal: {
    image: arsenalCard,
    color: "#49130e",
    primaryTextColor: "#FFFFFF",
    secondaryTextColor: "rgba(255, 255, 255, .8)",
    balancePlacement: "right-10 top-[30%]"
  }
};

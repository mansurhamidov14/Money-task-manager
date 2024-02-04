import type { IconTypes } from "solid-icons";
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd } from "solid-icons/ai";
import { FaRegularMoneyBill1, FaSolidComputer } from "solid-icons/fa";
import {
  IoGameControllerOutline,
  IoRestaurantOutline,
  IoShirtOutline,
  IoCarSportOutline,
  IoSchoolOutline,
  IoGift
} from "solid-icons/io";
import { RiHealthMedicalHeartPulseLine } from "solid-icons/ri";
import { Category, CategoryId } from "./types";
import { BiSolidPlaneAlt } from "solid-icons/bi";
import { BsLightbulb, BsScissors } from "solid-icons/bs";

const generateCategory = (
  id: CategoryId,
  icon: IconTypes,
  [accentColor, iconColor]: string[]
): Category => ({
  id,
  icon,
  colors: {
    accent: accentColor,
    icon: iconColor
  }
});

export const Categories: Record<CategoryId, Category> = {
  market: generateCategory("market", AiOutlineShoppingCart, ["#fef3c7", "#f59e0b"]),
  transfer: generateCategory("transfer", FaRegularMoneyBill1, ["#ccfbf1", "#2dd4bf"]),
  utility: generateCategory("utility", BsLightbulb, ["#cffafe", "#0891b2"]),
  restaurant: generateCategory("restaurant", IoRestaurantOutline, ["#f1f5f9", "#94a3b8"]),
  transport: generateCategory("transport", IoCarSportOutline, ["#cffafe", "#0e7490"]),
  clothing: generateCategory("clothing", IoShirtOutline, ["#fef9c3", "#facc15"]),
  beauty: generateCategory("beauty", BsScissors, ["#fdf4ff", "#c026d3"]),
  health: generateCategory("health", RiHealthMedicalHeartPulseLine, ["#dcfce7", "#4ade80"]),
  gift: generateCategory("gift", IoGift, ["#fef3c7", "#dc2626"]),
  education: generateCategory("education", IoSchoolOutline, ["#dbeafe", "#1d4ed8"]),
  electronics: generateCategory("electronics", FaSolidComputer, ["#d1fae5", "#059669"]),
  entertainment: generateCategory("entertainment", IoGameControllerOutline, ["#ede9fe", "#312e81"]),
  travel: generateCategory("travel", BiSolidPlaneAlt, ["#fdf2f8", "#d86779"]),
  other: generateCategory("other", AiOutlineAppstoreAdd, ["#f3f4f6", "#374151"])
};
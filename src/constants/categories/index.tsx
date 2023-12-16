import type { IconTypes } from "solid-icons";
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd } from "solid-icons/ai";
import { FaRegularMoneyBill1 } from "solid-icons/fa";
import {
  IoGameControllerOutline,
  IoRestaurantOutline,
  IoShirtOutline,
  IoCarSportOutline,
  IoSchoolOutline
} from "solid-icons/io";
import { RiHealthMedicalHeartPulseLine } from "solid-icons/ri";
import { Category, CategoryId } from "./types";

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
  transfer: generateCategory("transfer", FaRegularMoneyBill1, ["#ccfbf1", "#2dd4bf"]),
  market: generateCategory("market", AiOutlineShoppingCart, ["#fef3c7", "#f59e0b"]),
  restaurant: generateCategory("restaurant", IoRestaurantOutline, ["#f1f5f9", "#94a3b8"]),
  transport: generateCategory("transport", IoCarSportOutline, ["#cffafe", "#0e7490"]),
  clothing: generateCategory("clothing", IoShirtOutline, ["#fef9c3", "#facc15"]),
  health: generateCategory("health", RiHealthMedicalHeartPulseLine, ["#dcfce7", "#4ade80"]),
  education: generateCategory("education", IoSchoolOutline, ["#dbeafe", "#1d4ed8"]),
  entertainment: generateCategory("entertainment", IoGameControllerOutline, ["#ede9fe", "#312e81"]),
  other: generateCategory("other", AiOutlineAppstoreAdd, ["#f3f4f6", "#374151"])
};
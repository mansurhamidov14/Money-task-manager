import { IconTypes } from "solid-icons";
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd } from "solid-icons/ai";
import { FaRegularMoneyBill1, FaSolidComputer, FaSolidMoneyBillTransfer } from "solid-icons/fa";
import {
  IoGameControllerOutline,
  IoRestaurantOutline,
  IoShirtOutline,
  IoCarSportOutline,
  IoSchoolOutline,
  IoGift
} from "solid-icons/io";
import { RiHealthMedicalHeartPulseLine } from "solid-icons/ri";
import { BiSolidPlaneAlt } from "solid-icons/bi";
import { BsLightbulb, BsScissors } from "solid-icons/bs";
import { Category, CategoryId } from "@app/services";

class CategoryService {
  private categoriesMap: Record<CategoryId, Category>;
  public categories: Category[];
  public ids: CategoryId[];

  constructor() {
    this.categoriesMap = {
      market: this.generateCategory("market", AiOutlineShoppingCart, ["#fef3c7", "#f59e0b"]),
      transfer: this.generateCategory("transfer", FaRegularMoneyBill1, ["#ccfbf1", "#2dd4bf"]),
      utility: this.generateCategory("utility", BsLightbulb, ["#cffafe", "#0891b2"]),
      restaurant: this.generateCategory("restaurant", IoRestaurantOutline, ["#f1f5f9", "#94a3b8"]),
      transport: this.generateCategory("transport", IoCarSportOutline, ["#cffafe", "#0e7490"]),
      clothing: this.generateCategory("clothing", IoShirtOutline, ["#fef9c3", "#facc15"]),
      beauty: this.generateCategory("beauty", BsScissors, ["#fdf4ff", "#c026d3"]),
      health: this.generateCategory("health", RiHealthMedicalHeartPulseLine, ["#dcfce7", "#4ade80"]),
      gift: this.generateCategory("gift", IoGift, ["#fef3c7", "#dc2626"]),
      education: this.generateCategory("education", IoSchoolOutline, ["#dbeafe", "#1d4ed8"]),
      electronics: this.generateCategory("electronics", FaSolidComputer, ["#d1fae5", "#059669"]),
      entertainment: this.generateCategory("entertainment", IoGameControllerOutline, ["#ede9fe", "#312e81"]),
      travel: this.generateCategory("travel", BiSolidPlaneAlt, ["#fdf2f8", "#d86779"]),
      transferBetweenAccounts: this.generateCategory("transferBetweenAccounts", FaSolidMoneyBillTransfer, ["#f5f5f5", "#404040"]),
      other: this.generateCategory("other", AiOutlineAppstoreAdd, ["#f3f4f6", "#374151"])
    }
    this.categories = Object.values(this.categoriesMap);
    this.ids = Object.keys(this.categoriesMap) as CategoryId[];
  }

  public getCategory(id: CategoryId) {
    return this.categoriesMap[id];
  }

  public getIcon(id: CategoryId) {
    return this.getCategory(id).icon;
  }

  public getColors(id: CategoryId) {
    return this.getCategory(id).colors;
  }

  private generateCategory = (
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
}

export const categoryService = new CategoryService();

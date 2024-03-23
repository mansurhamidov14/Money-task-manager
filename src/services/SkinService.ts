import { cardSkins } from "@app/assets";
import { Skin } from "./types";

export class SkinService {
  private skinsMap: Record<string, string>;
  private fallbackImg: string;
  public skins: Skin[];

  constructor() {
    this.skinsMap = {
      ...cardSkins.colors,
      ...cardSkins.images,
      ...cardSkins.banks,
      ...cardSkins.football
    };
    this.skins = Object.entries(this.skinsMap).map(([id, image]) => ({ id, image }));
    this.fallbackImg = this.skinsMap.green;
  }

  getImage(id: string) {
    return this.skinsMap[id] ?? this.fallbackImg;
  }
}

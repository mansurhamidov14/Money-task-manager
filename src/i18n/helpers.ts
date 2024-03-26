import { availableLangs } from "./consts";
import { Lang } from "./types";

export const getAppropriateLanguageFromUserAgent = (defaultValue: Lang) => {
  const userAgentLanguage = navigator.language.slice(0, 2) as any;

  if (availableLangs.includes(userAgentLanguage)) {
    return userAgentLanguage;
  }

  const otherLangs = navigator.languages.map(lang => lang.slice(0, 2));
  const alternativeLang = otherLangs.find(lang => availableLangs.includes(lang as any));

  return alternativeLang ?? defaultValue;
}
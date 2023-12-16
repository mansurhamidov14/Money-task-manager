import { flattenObject } from "@app/helpers";
import { I18nOptions, Lang } from "./types";

export const availableLangs: Lang[] = ["az", "en", "ru"];

const getAppropriateLanguageFromUserAgent = (defaultValue: Lang) => {
  const userAgentLanguage = navigator.language.slice(0, 2) as any;

  if (availableLangs.includes(userAgentLanguage)) {
    return userAgentLanguage;
  }

  const otherLangs = navigator.languages.map(lang => lang.slice(0, 2));
  const alternativeLang = otherLangs.find(lang => availableLangs.includes(lang as any));

  return alternativeLang ?? defaultValue;
}

export const translations: Record<Lang, { [key: string ]: any }> = {
  az: {},
  en: {},
  ru: {}
};

const defaulti18nConfig: Required<Omit<I18nOptions, "resources">> = {
  defaultLang: getAppropriateLanguageFromUserAgent("en"),
  defaultNs: "Messages",
  keySeparator: "."
};

export let i18nConfig: Required<Omit<I18nOptions, "resources">> = {} as any;

export function initI18n(options: I18nOptions) {
  i18nConfig = { ...defaulti18nConfig, ...options };
  Object.entries(options.resources).forEach(([lang, nss]) => {
    Object.entries(nss).forEach(([ns, obj]) => {
      translations[lang as Lang][ns] = flattenObject(obj, "", {}, i18nConfig.keySeparator);
    });
  });
}


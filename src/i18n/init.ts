import { appLang } from "@app/storage";
import { flattenObject } from "@app/helpers";
import { I18nOptions, Lang } from "./types";

export const translations: Record<Lang, { [key: string ]: any }> = {
  az: {},
  en: {},
  ru: {},
  ua: {}
};

const defaulti18nConfig: Required<Omit<I18nOptions, "resources">> = {
  defaultLang: appLang.value,
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


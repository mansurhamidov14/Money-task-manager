import { createSignal } from "solid-js";

import flagAz from "@app/assets/langs/az-circle.png";
import flagEn from "@app/assets/langs/en-circle.png";
import flagRu from "@app/assets/langs/ru-circle.png";

import actionsAz from "./locales/az/Actions.json";
import actionsEn from "./locales/en/Actions.json";
import actionsRu from "./locales/ru/Actions.json";

import dateAz from "./locales/az/Date.json";
import dateEn from "./locales/en/Date.json";
import dateRu from "./locales/ru/Date.json";

import messagesAz from "./locales/az/Messages.json";
import messagesEn from "./locales/en/Messages.json";
import messagesRu from "./locales/ru/Messages.json";

import { i18nConfig, initI18n, translations } from "./init";
import { Lang, LangData } from "./types";

const localStorageAccessKey = "WFOAppLang";
export const langData: LangData = {
  az: {
    code: "AZ",
    name: "Azərbaycan dili",
    flag: flagAz
  },
  en: {
    code: "EN",
    name: "English",
    flag: flagEn
  },
  ru: {
    code: "RU",
    name: "Русский язык",
    flag: flagRu
  }
};

const resources: Record<Lang, any> = {
  az: {
    Actions: actionsAz,
    Date: dateAz,
    Messages: messagesAz,
  },
  en: {
    Actions: actionsEn,
    Date: dateEn,
    Messages: messagesEn,
  },
  ru: {
    Actions: actionsRu,
    Date: dateRu,
    Messages: messagesRu,
  }
};

function t(
  key: string,
  ns?: string,
  params?: Record<string, number | string>,
  lang?: Lang
): string {
  const _ns = ns ?? i18nConfig.defaultNs;
  const locale = lang ?? getLocale();
  const message = translations[locale][_ns][key] ?? key;
  if (!params) {
    return message;
  }
  return bindParams(message, params);
}

function bindParams(text: string, params: Record<string, number | string>) {
  return Object.entries(params).reduce((acc, [key, val]) => {
    return acc.replace(`{{${key}}}`, String(val));
  }, text);
}

initI18n({ resources });
const initialLang = localStorage.getItem(localStorageAccessKey) as Lang | null || i18nConfig.defaultLang;
const [getLocale, setLocale] = createSignal<Lang>(initialLang);
document.getElementsByTagName("html")[0]!.setAttribute("lang", initialLang);

const setLocaleWrapper = (locale: Lang) => {
  document.getElementsByTagName("html")[0]!.setAttribute("lang", locale);
  setTimeout(() => {
    setLocale(locale);
    localStorage.setItem(localStorageAccessKey, locale);
    window.dispatchEvent(new CustomEvent("appLanguageChange"))
  });
}

export {
  getLocale,
  setLocaleWrapper as setLocale,
  t
}
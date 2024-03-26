import { createSignal } from "solid-js";
import { azFlag, ruFlag, uaFlag, usFlag } from "@app/assets";
import { appLang } from "@app/storage";

import actionsAz from "./locales/az/Actions.json";
import actionsEn from "./locales/en/Actions.json";
import actionsRu from "./locales/ru/Actions.json";
import actionsUa from "./locales/ua/Actions.json";

import dateAz from "./locales/az/Date.json";
import dateEn from "./locales/en/Date.json";
import dateRu from "./locales/ru/Date.json";
import dateUa from "./locales/ua/Date.json";

import messagesAz from "./locales/az/Messages.json";
import messagesEn from "./locales/en/Messages.json";
import messagesRu from "./locales/ru/Messages.json";
import messagesUa from "./locales/ua/Messages.json";

import exceptionsAz from "./locales/az/Exceptions.json";
import exceptionsEn from "./locales/en/Exceptions.json";
import exceptionsRu from "./locales/ru/Exceptions.json";
import exceptionsUa from "./locales/ua/Exceptions.json";

import { i18nConfig, initI18n, translations } from "./init";
import { Lang, LangData } from "./types";

export * from "./components";
export * from "./consts";

export const langData: LangData = {
  az: {
    code: "AZ",
    name: "Azərbaycan dili",
    flag: azFlag
  },
  en: {
    code: "EN",
    name: "English",
    flag: usFlag
  },
  ru: {
    code: "RU",
    name: "Русский",
    flag: ruFlag
  },
  ua: {
    code: "UA",
    name: "Українська",
    flag: uaFlag
  }
};

const resources: Record<Lang, any> = {
  az: {
    Actions: actionsAz,
    Date: dateAz,
    Messages: messagesAz,
    Exceptions: exceptionsAz
  },
  en: {
    Actions: actionsEn,
    Date: dateEn,
    Messages: messagesEn,
    Exceptions: exceptionsEn
  },
  ru: {
    Actions: actionsRu,
    Date: dateRu,
    Messages: messagesRu,
    Exceptions: exceptionsRu
  },
  ua: {
    Actions: actionsUa,
    Date: dateUa,
    Messages: messagesUa,
    Exceptions: exceptionsUa
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

export function tDate(key: string, params?: Record<string, number | string>, lang?: Lang) {
  return t(key, "Date", params, lang);
}

function bindParams(text: string, params: Record<string, number | string>) {
  return Object.entries(params).reduce((acc, [key, val]) => {
    return acc.replace(`{{${key}}}`, String(val));
  }, text);
}

initI18n({ resources });
const initialLang = appLang.value;
const [getLocale, setLocale] = createSignal<Lang>(initialLang);
document.getElementsByTagName("html")[0]!.setAttribute("lang", initialLang);

appLang.onChange(value => {
  document.getElementsByTagName("html")[0]!.setAttribute("lang", value);

  // TODO review the line
  setTimeout(() => {
    setLocale(value);
    window.dispatchEvent(new CustomEvent("appLanguageChange"));
  });
})

const setLocaleWrapper = (locale: Lang) => {
  appLang.value = locale;
}

export {
  getLocale,
  setLocaleWrapper as setLocale,
  t
}
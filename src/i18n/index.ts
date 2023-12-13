import { createSignal } from "solid-js";

import messagesAz from "./locales/az/Messages.json";
import messagesEn from "./locales/en/Messages.json";
import messagesRu from "./locales/ru/Messages.json";

import actionsAz from "./locales/az/Actions.json";
import actionsEn from "./locales/en/Actions.json";
import actionsRu from "./locales/ru/Actions.json";

import { i18nConfig, initI18n, translations } from "./init";
import { Lang } from "./types";

const resources: Record<Lang, any> = {
  az: {
    Messages: messagesAz,
    Actions: actionsAz
  },
  en: {
    Messages: messagesEn,
    Actions: actionsEn
  },
  ru: {
    Messages: messagesRu,
    Actions: actionsRu
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
const [getLocale, setLocale] = createSignal<Lang>(i18nConfig.defaultLang);

export {
  getLocale,
  setLocale,
  t
}
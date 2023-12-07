import { createSignal } from "solid-js";
import messagesAz from "./locales/az/Messages";
import messagesEn from "./locales/en/Messages";
import messagesRu from "./locales/ru/Messages";

type Langs = "az" | "en" | "ru";

const [getLocale, setLocale] = createSignal<Langs>("az");
const translations: Record<Langs, any> = {
  az: {
    Messages: messagesAz
  },
  en: {
    Messages: messagesEn
  },
  ru: {
    Messages: messagesRu
  }
};

function t(
  key: string,
  ns: string = "Messages",
  params?: Record<string, number | string>,
  lang?: Langs
): string {
  const locale = lang ?? getLocale();
  const message = translations[locale][ns][key] ?? key;
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

export {
  getLocale,
  setLocale,
  t
}
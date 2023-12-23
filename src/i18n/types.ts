export type Lang = "az" | "en" | "ru" | "ua";
export type I18nOptions = {
  defaultLang?: Lang;
  resources: Record<Lang, {[key: string]: any}>;
  defaultNs?: string;
  keySeparator?: string;
}

export type TrComponentProps = {
  children: string;
} & { [key: string]: string | number }

export type LangData = Record<Lang, {
  flag: string;
  name: string;
  code: string;
}>

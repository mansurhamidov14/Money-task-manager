import { StorageItem } from "@app/entities";
import { getAppropriateLanguageFromUserAgent } from "@app/i18n/helpers";
import { Lang } from "@app/i18n/types";
import { Theme } from "@app/stores";

export const refreshTokenItem = new StorageItem<string | null>({
  accessor: "refresh_token",
  initialValue: null,
});

export const redirectAfterLogin = new StorageItem<string>({
  accessor: "WFOAppRedirectUrl",
  initialValue: "/home",
  storage: sessionStorage
});

export const appTheme = new StorageItem<Theme>({
  accessor: "WFOAppTheme",
  initialValue: window?.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
});

export const appLang = new StorageItem<Lang>({
  accessor: "WFOAppLang",
  initialValue: getAppropriateLanguageFromUserAgent("en")
});

export const firstRunHappened = new StorageItem<boolean | null>({
  accessor: "WFOAppFirstRun",
  initialValue: null
});

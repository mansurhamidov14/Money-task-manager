import { createRoot, createSignal } from "solid-js";
import { Screen, ScreenDefaultRoutes, ScreenRecentRoutes } from "./types";

export const defaultRoutes: ScreenDefaultRoutes = {
  home: "/home",
  history: "/history"
};

function initNavigation() {
  const [currentScreen, setCurrentScreen] = createSignal<Screen>("home");
  const [
    recentScreenRoutes,
    setRecentScreenRoutes
  ] = createSignal<ScreenRecentRoutes>(defaultRoutes);

  const isScreenActive = (screen: Screen) => {
    return currentScreen() === screen;
  };

  const getNavLinkPath = (screen: Screen) => {
    return isScreenActive(screen) ? defaultRoutes[screen] : recentScreenRoutes()[screen];
  }

  const navigate = (path: string, screen: Screen) => {
    setCurrentScreen(screen);
    navigation.setRecentScreenRoutes({
      ...navigation.recentScreenRoutes(),
      [screen]: path
    });
  }

  return {
    isScreenActive,
    recentScreenRoutes,
    setRecentScreenRoutes,
    getNavLinkPath,
    currentScreen,
    setCurrentScreen,
    navigate
  };
}

export const navigation = createRoot(initNavigation);

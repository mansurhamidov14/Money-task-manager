export type Screen = "home" | "history";
export type ScreenRecentRoutes = Record<Screen, string>;
export type ScreenDefaultRoutes = Record<Screen, string>;
export type NavigationRoute = {
  screen: Screen;
  path: string;
}

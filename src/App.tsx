import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { Match, Switch, onMount } from "solid-js";
import { FaSolidChartSimple, FaSolidHouseChimney } from "solid-icons/fa";
import { AddNewNavButton, BottomNavigation, Loading, NavLink, ToastList } from "@app/components";
import { AuthScreen, HistoryScreen, HomeScreen } from "@app/screens";
import { userService, transactionService } from "@app/services";
import { transactions, user, themeStore } from "@app/stores";

import "./App.css";

function App({ children }: RouteSectionProps) {
  return (
    <div class="layout grid h-[100svh]">
      {children}
      <BottomNavigation>
        <NavLink screen="home" icon={<FaSolidHouseChimney />} />
        <AddNewNavButton />
        <NavLink screen="history" icon={<FaSolidChartSimple />} />
      </BottomNavigation>
    </div>
  );
}

export default function() {
  const { theme } = themeStore;
  onMount(async () => {
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      const userTransactions = await transactionService.getUserTransactions(authorizedUser.id);
      setTimeout(() => {
        transactions.setTransactionsStoreData(userTransactions);
      }, 500);
      user.setCurrentUser({
        isAuthorized: true,
        isLoading: false,
        data: authorizedUser
      });
    } else {
      user.setCurrentUser({
        isAuthorized: false,
        isLoading: false
      });
    }
  });

  return (
    <div class={`${theme()} app-container`}>
      <Switch
        fallback={(
          <div class="h-[100svh] flex items-center">
            <Loading />
          </div>
        )}
      >
        <Match when={!user.currentUser().isLoading && user.currentUser().isAuthorized}>
          <Router root={App}>
            <Route path="/" component={() => <Navigate href="/home" />} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/history" component={HistoryScreen} />
          </Router>
        </Match>
        <Match when={!user.currentUser().isLoading && !user.currentUser().isAuthorized}>
          <AuthScreen />
        </Match>
      </Switch>
      <ToastList />
    </div>
  );
}

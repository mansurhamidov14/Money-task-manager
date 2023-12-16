import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { Match, Switch, onMount } from "solid-js";
import {
  AddNewNavButton,
  BottomNavigation,
  HistoryNavLink,
  HomeNavLink,
  Loading
} from "@app/components";
import {
  AuthScreen,
  HistoryScreen,
  HomeScreen
} from "@app/screens";
import { HistoryRecordsScreen } from "@app/screens/HistoryScreen/HistoryRecords";
import { userService, transactionService } from "@app/services";
import { transactions, user } from "@app/stores";

import "./App.css";
import themeStore from "./stores/theme";

function App({ children }: RouteSectionProps) {
  return (
    <div class="layout grid h-[100svh]">
      {children}
      <BottomNavigation>
        <HomeNavLink />
        <AddNewNavButton />
        <HistoryNavLink />
      </BottomNavigation>
    </div>
  );
}

export default function() {
  const { theme } = themeStore;
  onMount(async () => {
    transactions.setTransactionsStoreLoading();
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      const userTransactions = await transactionService.getUserTransactions(authorizedUser.id);
      setTimeout(() => {
        transactions.setTransactionsStoreData(userTransactions);
      }, 3500);
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
            <Route path="/history/records" component={HistoryRecordsScreen} />
          </Router>
        </Match>
        <Match when={!user.currentUser().isLoading && !user.currentUser().isAuthorized}>
          <AuthScreen />
        </Match>
      </Switch>
    </div>
  );
}

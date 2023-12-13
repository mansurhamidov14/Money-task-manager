import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import {
  AddNewNavButton,
  BottomNavigation,
  HistoryNavLink,
  HomeNavLink,
  Loading
} from "@app/components";
import { HistoryScreen, HomeScreen } from "@app/screens";
import { HistoryRecordsScreen } from "@app/screens/HistoryScreen/HistoryRecords";
import { userService, transactionService } from "@app/services";
import { transactions, user } from "@app/stores";

import "./App.css";

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
  onMount(async () => {
    transactions.setTransactionsStoreLoading();
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      const userTransactions = await transactionService.getUserTransactions(authorizedUser.id);
      setTimeout(() => {
        transactions.setTransactionsStoreData(userTransactions);
      }, 5000);
      setTimeout(() => {
        user.setCurrentUser({
          isAuthorized: true,
          isLoading: false,
          data: authorizedUser
        });
      }, 2000);
    }
  });

  return (
    <Show
      when={!user.currentUser().isLoading}
      fallback={(
        <div class="h-[100svh] flex items-center">
          <Loading />
        </div>
      )}
    >
      <Router root={App}>
        <Route path="/" component={() => <Navigate href="/home" />} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/history" component={HistoryScreen} />
        <Route path="/history/records" component={HistoryRecordsScreen} />
      </Router>
    </Show>
  )
}

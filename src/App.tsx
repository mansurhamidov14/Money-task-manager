import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { onMount } from "solid-js";
import {
  AddNewNavButton,
  BottomNavigation,
  HistoryNavLink,
  HomeNavLink
} from "./components";
import { HistoryScreen, HomeScreen } from "./screens";
import { HistoryRecordsScreen } from "./screens/HistoryScreen/HistoryRecords";
import { userService } from "./services";
import { transactions, user } from "./stores";

import "./App.css";
import { transactionService } from "./services/TransactionService";

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
    console.log("Fetching authorized user");
    transactions.setTransactionsStoreLoading();
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      console.log("authorized", authorizedUser);
      const userTransactions = await transactionService.getUserTransactions(authorizedUser.id);
      transactions.setTransactionsStoreData(userTransactions);
      // console.log(transactions.transactionsStore());
      console.log("user tr", userTransactions);
      user.setCurrentUser({
        isAuthorized: true,
        isLoading: false,
        data: authorizedUser
      });
    }
  });

  return (
    <>
      {user.currentUser().isLoading ? (
        <div>...Loading</div>
      ) : (
        <Router root={App}>
          <Route path="/" component={() => <Navigate href="/home" />} />
          <Route path="/home" component={HomeScreen} />
          <Route path="/history" component={HistoryScreen} />
          <Route path="/history/records" component={HistoryRecordsScreen} />
        </Router>
      )}
    </>
  )
}

import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import { BottomNavigation, Layout, Loading, ToastList } from "@app/components";
import { RerenderOnLangChange } from "@app/i18n";
import { HistoryScreen, HomeScreen, LoginPage, NewTransactionScreen, SignUpPage } from "@app/screens";
import { userService, transactionService } from "@app/services";
import { transactionsStore, user, themeStore } from "@app/stores";

import "./App.css";

function App(props: RouteSectionProps) {
  return (
    <Layout>
      <RerenderOnLangChange>
        {props.children}
      </RerenderOnLangChange>
      <Show when={user.currentUser().isAuthorized}>
        <BottomNavigation />
      </Show>
    </Layout>
  );
}

export default function() {
  const { theme } = themeStore;
  onMount(async () => {
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      const userTransactions = await transactionService.getUserTransactions(authorizedUser.id);
      setTimeout(() => {
        transactionsStore.setTransactions(userTransactions);
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
      <Show
        when={!user.currentUser().isLoading} fallback={(
          <div class="h-[100svh] flex items-center bg-secondary-100 dark:bg-gray-800">
            <Loading />
          </div>
        )}
      >
        <Router root={App}>
          <Route path="/" component={() => <Navigate href="/home" />} />
          <Route path="/auth">
            <Route path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
          </Route>
          <Route path="/home" component={HomeScreen} />
          <Route path="/history" component={HistoryScreen} />
          <Route path="/new-transaction" component={NewTransactionScreen} />
        </Router>
      </Show>
      <ToastList />
    </div>
  );
}

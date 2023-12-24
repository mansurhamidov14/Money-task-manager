import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import {
  BottomNavigation,
  ConfirmationModal,
  Layout,
  Loading,
  ToastList
} from "@app/components";
import { RerenderOnLangChange } from "@app/i18n";
import {
  HistoryScreen,
  HomeScreen,
  LoginPage,
  NewAccountScreen,
  NewTransactionScreen,
  SettingsScreen,
  SignUpPage,
  TasksScreen
} from "@app/screens";
import { userService } from "@app/services";
import { transactionsStore, user, accountsStore } from "@app/stores";
import { ProtectedRoute } from "@app/stores/navigation/components";

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
  onMount(async () => {
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      await transactionsStore.fetchUserTransactions(authorizedUser.id);
      await accountsStore.fetchUserAccounts(authorizedUser.id);
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
    <div class="app-container">
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
          <ProtectedRoute path="/home" component={HomeScreen} />
          <ProtectedRoute path="/history" component={HistoryScreen} />
          <ProtectedRoute path="/new-account" component={NewAccountScreen} />
          <ProtectedRoute path="/new-transaction" component={NewTransactionScreen} />
          <ProtectedRoute path="/tasks" component={TasksScreen} />
          <ProtectedRoute path="/settings" component={SettingsScreen} />
        </Router>
      </Show>
      <ToastList />
      <ConfirmationModal />
    </div>
  );
}

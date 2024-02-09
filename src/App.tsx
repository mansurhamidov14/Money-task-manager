import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Show, createSignal, onMount } from "solid-js";
import {
  AppLoading,
  BottomNavigation,
  ConfirmationModal,
  Layout,
  ToastList
} from "@app/components";
import { REDIRECT_URL_STORE_KEY } from "@app/constants";
import { RerenderOnLangChange } from "@app/i18n";
import {
  EditAccountScreen,
  EditTransactionScreen,
  HistoryScreen,
  HomeScreen,
  LoginPage,
  NewAccountScreen,
  NewTaskScreen,
  NewTransactionScreen,
  PinInputPage,
  SettingsScreen,
  SignUpPage,
  TasksScreen,
  TransferBetweenAccountsScreen
} from "@app/screens";
import {
  ChangeAvatarScreen,
  ChangeLanguageScreen,
  ChangePasswordScreen,
  ChangePinScreen,
  PersonalInfoScreen
} from "@app/screens/SettingsScreen/pages";
import { DateProcessorProvider } from "@app/providers";
import { clientService, userService } from "@app/services";
import { user } from "@app/stores";
import { ProtectedRoute } from "@app/stores/navigation/components";

import "./App.css";
import { EditTaskScreen } from "./screens/EditTaskScreen";
import { FutureTasksScreen, TasksArchiveScreen } from "./screens/TasksScreen/pages";

const queryClient = new QueryClient();

function App(props: RouteSectionProps) {
  return (
    <Layout>
      <RerenderOnLangChange>
        <DateProcessorProvider>
          {props.children}
        </DateProcessorProvider>
      </RerenderOnLangChange>
      <Show when={user.currentUser().status === "authorized"}>
        <BottomNavigation />
      </Show>
    </Layout>
  );
}

export default function() {
  const [clientInitialized, setClientInitialized] = createSignal(false);

  onMount(async () => {
    clientService.onInitilized(() => {
      setClientInitialized(true);
    });
    const authorizedUser = await userService.getAuthorizedUser();
    if (authorizedUser) {
      if (authorizedUser.hasPinProtection) {
        const currentUrl = window.location.hash.slice(1);
        localStorage.setItem(REDIRECT_URL_STORE_KEY, currentUrl ?? "/home");
      }
      user.setCurrentUser({
        status: authorizedUser.hasPinProtection ? "locked" : "authorized",
        data: authorizedUser
      });
    } else {
      user.setCurrentUser({ status: "unauthorized" });
    }
  });

  return (
    <div class="app-container">
      <QueryClientProvider client={queryClient}>
        <Show
          when={clientInitialized() && user.currentUser().status !== "loading"}
          fallback={<AppLoading />}
        >
          <Router root={App}>
            <Route path="/" component={() => <Navigate href="/home" />} />
            <Route path="/auth">
              <Route path="/" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/pin" component={PinInputPage} />
            </Route>
            <ProtectedRoute path="/home" component={HomeScreen} />
            <ProtectedRoute path="/history" component={HistoryScreen} />
            <ProtectedRoute path="/new-account" component={NewAccountScreen} />
            <ProtectedRoute path="/edit-account/:id" component={EditAccountScreen} />
            <ProtectedRoute path="/new-transaction" component={NewTransactionScreen} />
            <ProtectedRoute path="/edit-transaction/:id" component={EditTransactionScreen} />
            <ProtectedRoute path="/new-task" component={NewTaskScreen} />
            <ProtectedRoute path="/edit-task/:id" component={EditTaskScreen} />
            <Route path="/tasks">
              <ProtectedRoute path="/" component={TasksScreen} />
              <ProtectedRoute path="/future" component={FutureTasksScreen} />
              <ProtectedRoute path="/archive" component={TasksArchiveScreen} />
            </Route>
            <ProtectedRoute path="/new-transfer" component={TransferBetweenAccountsScreen} />
            <Route path="/settings">
              <ProtectedRoute path="/" component={SettingsScreen} />
              <ProtectedRoute path="/change-avatar" component={ChangeAvatarScreen} />
              <ProtectedRoute path="/change-language" component={ChangeLanguageScreen} />
              <ProtectedRoute path="/change-password" component={ChangePasswordScreen} />
              <ProtectedRoute path="/change-pin" component={ChangePinScreen} />
              <ProtectedRoute path="/personal-info" component={PersonalInfoScreen} />
            </Route>
          </Router>
        </Show>
        <ToastList />
        <ConfirmationModal />
      </QueryClientProvider>
    </div>
  );
}

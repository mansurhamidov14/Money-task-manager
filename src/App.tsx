import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Match, Show, Switch, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import {
  AppLoading,
  BottomNavigation,
  ConfirmationModal,
  Layout,
  NetworkError,
  ToastList
} from "@app/components";
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
import { HttpStatus, authService, authUserHttpClient, clientService, userService } from "@app/services";
import { user } from "@app/stores";
import { ProtectedRoute } from "@app/stores/navigation/components";

import { EditTaskScreen } from "./screens/EditTaskScreen";
import { FutureTasksScreen, TasksArchiveScreen } from "./screens/TasksScreen/pages";
import "./App.css";
import { redirectAfterLogin } from "./storage";

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
  const [networkStatus, setNetworkStatus] = createSignal<"idle" | "error" | "success">("idle");

  const initApp = async () => {
    try {
      const { access_token } = await authService.getRefreshToken();
      userService.setAccessToken(access_token);
      const { data: authorizedUser } = await userService.getUser();
      if (authorizedUser.hasPinProtection) {
        const currentUrl = window.location.hash.slice(1);
        redirectAfterLogin.value = currentUrl ?? "/home";
      }
      user.setCurrentUser({
        status: authorizedUser.hasPinProtection ? "locked" : "authorized",
        data: authorizedUser
      });
    } catch (e: any) {
      if (e.status !== HttpStatus.UNAUTHORIZED) {
        setNetworkStatus("error");
      }
    }
  }

  const connectionSuccesHandler = () => setNetworkStatus("success");
  const connectionErrorHandler = () => setNetworkStatus("error");

  onMount(() => {
    clientService.on("connectionSuccess", connectionSuccesHandler);
    clientService.on("connectionError", connectionErrorHandler);
    authUserHttpClient.on(HttpStatus.UNAUTHORIZED, user.logOut);
  });

  onCleanup(() => {
    clientService.off("connectionSuccess", connectionSuccesHandler);
    clientService.off("connectionError", connectionErrorHandler);
    authUserHttpClient.off(HttpStatus.UNAUTHORIZED, user.logOut);
  });

  const refetchClientData = () => {
    setNetworkStatus("idle");
    clientService.fetchClientData();
  }

  createEffect(() => {
    if (networkStatus() === "success") {
      initApp();
    }
  });

  return (
    <div class="app-container">
      <QueryClientProvider client={queryClient}>
        <Switch fallback={<AppLoading />}>
          <Match when={networkStatus() === "success" && user.currentUser().status !== "loading"}>
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
          </Match>
          <Match when={networkStatus() === "error"}>
            <NetworkError onTryAgain={refetchClientData} />
          </Match>
        </Switch>
        <ToastList />
        <ConfirmationModal />
      </QueryClientProvider>
    </div>
  );
}

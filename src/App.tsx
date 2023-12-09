import { Navigate, Route, RouteSectionProps, HashRouter as Router } from "@solidjs/router";
import {
  AddNewNavButton,
  BottomNavigation,
  HistoryNavLink,
  HomeNavLink
} from "./components";
import { HistoryScreen, HomeScreen } from "./screens";
import "./App.css";
import { HistoryRecordsScreen } from "./screens/HistoryScreen/HistoryRecords";


function App({ children }: RouteSectionProps) {
  return (
    <div class="layout grid h-screen">
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
  return (
    <Router root={App}>
      <Route path="/" component={() => <Navigate href="/home" />} />
      <Route path="/home" component={HomeScreen} />
      <Route path="/history" component={HistoryScreen} />
      <Route path="/history/records" component={HistoryRecordsScreen} />
    </Router>
  );
}

import { Route } from "@solidjs/router";
import { Component } from "solid-js";
import { withProtectedRoute } from "../hocs";

export function ProtectedRoute(props: { path: string, component: Component }) {
  return <Route path={props.path} component={withProtectedRoute(props.component)} />
}
/* @refresh reload */
import { render } from 'solid-js/web'
import "./polyfills";
import "solid-slider/slider.css";

import App from "./App";
import "./font.css";
import "./index.css";

const root = document.getElementById("root");

render(() => <App />, root!);


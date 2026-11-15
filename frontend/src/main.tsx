import "./index.css";

import { render } from "preact";

import { App } from "./app/app";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Не найден корневой элемент приложения");
}

render(<App />, root);

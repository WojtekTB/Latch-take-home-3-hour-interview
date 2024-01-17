import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import inputData from "./input.json";

import App from "./App";
import JsonRender from "./JsonRender";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <JsonRender json={inputData} />
  </StrictMode>
);

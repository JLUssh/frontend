//eslint-disable-next-line
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { ContextProvider } from "./store";

// console.log(React);
// console.log(ReactDOM);
// window.React = React;

let root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </React.StrictMode>
  );
}

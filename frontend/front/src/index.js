import "../src/features/newrelic/index";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

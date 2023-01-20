import React from "react";
import { render } from "react-dom";
import App from './components/App.jsx'

render(
  <div>
    <p>
      <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p>
    <App />
  </div>,
  document.getElementById("root")
);

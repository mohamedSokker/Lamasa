import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ContextProvider } from "./contexts/MainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </ContextProvider>
  </BrowserRouter>
);

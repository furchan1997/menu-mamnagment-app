import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DishProvider } from "./contexts/dish.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DishProvider>
        <App />
      </DishProvider>
    </BrowserRouter>
  </StrictMode>
);

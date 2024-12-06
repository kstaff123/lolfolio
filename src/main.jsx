import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";

import { ProfileProvider } from "./ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </Router>
  </StrictMode>
);

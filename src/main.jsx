import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const savedTheme = localStorage.getItem("theme")

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
   <ThemeProvider>
     <App />
   </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)

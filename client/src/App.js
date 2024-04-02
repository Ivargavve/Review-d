import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import React, { useEffect } from 'react';

// App component that wraps the entire application
function App() {
  // Retrieve the current mode (light or dark) from the Redux store
  const mode = useSelector((state) => state.mode);
  // Create a memoized theme object using the current mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  // Set the document title dynamically
  const Path = window.location.pathname;
  const changeTitle = () => {
    document.title = "Review --d";
    if (isAuth) {
      document.title += Path;
    }
  }
  useEffect(() => {
    changeTitle();
  });
  // Render the application with the appropriate theme
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

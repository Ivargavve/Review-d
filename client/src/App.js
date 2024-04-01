import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// App component that wraps the entire application
function App() {
  // Retrieve the current mode (light or dark) from the Redux store
  const mode = useSelector((state) => state.mode);

  // Create a memoized theme object using the current mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Render the application with the appropriate theme
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* Home route */}
            <Route path="/" element={<LoginPage />} />

            {/* Home page route */}
            <Route path="/home" element={<HomePage />} />

            {/* Profile page route with a dynamic userId parameter */}
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

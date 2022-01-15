import { useState, createContext } from "react";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../contexts/ThemeContext";

const Layout = ({ startingTheme, children }) => {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
};

const LayoutNoThemeProvider = ({ startingTheme, children }) => {
  const { theme } = useContext(ThemeContext);

  return <div className={"container-fluid " + theme}>{children}</div>;
};

export default Layout;

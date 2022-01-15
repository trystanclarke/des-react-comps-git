import { useState } from "react";

const useTheme = (startingTheme = "light") => {
  const [theme, setTheme] = useState(startingTheme);

  const validateTheme = (themeVal) => {
    if (themeVal === "dark") setTheme("dark");
    else setTheme("light");
  };

  return { theme, setTheme: validateTheme };
};

export default useTheme;

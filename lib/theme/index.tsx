// @ts-nocheck
import React, { useEffect, createContext } from "react";
import { COLORS } from "./color";

export const getInitalColorMode = () => {
  const persistedColorPreference = window?.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";

  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  // 如果不存在用户的偏好，查询系统设置
  const mql = window?.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";

  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }

  // 默认返回白天模式
  return "light";
};
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState("");
  const setColorMode = (value) => {
    rawSetColorMode(value);
    // Persist it on update
    window.localStorage.setItem("color-mode", value);
    const root = document.documentElement;
    Object.entries(COLORS[value]).forEach(([prefix, vars]) => {
      Object.entries(vars).forEach(([name, value]) => {
        const VARS = "--" + prefix + "-" + name;
        root.style.setProperty(VARS, value);
      });
    });
  };
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = JSON.parse(root.style.getPropertyValue("--prefers-dark"));
    rawSetColorMode(isDark ? "dark" : "light");
  }, []);


  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

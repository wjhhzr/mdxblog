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
  // 当前主题
  const [colorMode, setColorMode] = React.useState();
  
  // 初始化完成后
  useEffect(() => {
    setMode(getInitalColorMode())
  }, []);

  // 设置主题
  function setMode(value) {
    setColorMode(value);
    // 本地持久化
    window.localStorage.setItem("color-mode", value);
    let bodyClass = window.document.body.classList;
    value === "dark" ? bodyClass.add("dark") : bodyClass.remove("dark");
  }

  // 主题切换函数
  function toggleColorMode() {
    let currentMode = colorMode === "dark" ? "light" : "dark";
    setMode(currentMode);
  }

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

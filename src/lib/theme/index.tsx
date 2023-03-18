// @ts-nocheck
import React, { useEffect, createContext, useMemo, useState } from "react";
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

const PREFERS_DARK_CSS_PROP = "--prefers-dark";
const ThemeProvider = ({ children }) => {
  // 当前主题
  const [colorMode, setColorMode] = useState();


  // 设置主题
  function setMode(value) {
    setColorMode(value);
    // 本地持久化
    window.localStorage.setItem("color-mode", value);
    let root = window.document.documentElement;
    Object.entries(COLORS[value]).forEach(([type, typeColors])=>{
      Object.entries(typeColors).forEach(([name,value])=>{
        root.style.setProperty(`--${type}-${name}`,value)
      })
    })
  }

  // 主题切换函数
  function toggleColorMode() {
    let currentMode = colorMode === "dark" ? "light" : "dark";
    setMode(currentMode);
  }

  useEffect(()=>{
    setMode(getInitalColorMode())
  },[])

  return (
    <ThemeContext.Provider value={{
      colorMode,
      toggleColorMode,
    }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

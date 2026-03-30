import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// NOTE: Theme preference is UI-only and does not contain client or business data.
const STORAGE_KEY = "aipush-theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return { theme, toggle };
}
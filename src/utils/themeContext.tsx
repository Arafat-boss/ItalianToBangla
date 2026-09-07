import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    cardBackground: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    dockBackground: string;
    dockBorder: string;
    dockButtonBg: string;
    dockButtonBorder: string;
    dockIconColor: string;
    pillBg: string;
    pillText: string;
    inputBg: string;
    inputBorder: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = {
    background: isDarkMode ? "#09090b" : "#f8fafc",
    cardBackground: isDarkMode ? "#18181b" : "#ffffff",
    cardBorder: isDarkMode ? "#27272a" : "#e2e8f0",
    textPrimary: isDarkMode ? "#f8fafc" : "#0f172a",
    textSecondary: isDarkMode ? "#cbd5e1" : "#475569",
    textMuted: isDarkMode ? "#a1a1aa" : "#64748b",
    dockBackground: isDarkMode ? "rgba(24, 24, 27, 0.96)" : "rgba(255, 255, 255, 0.96)",
    dockBorder: isDarkMode ? "#3f3f46" : "#e2e8f0",
    dockButtonBg: isDarkMode ? "#27272a" : "#f1f5f9",
    dockButtonBorder: isDarkMode ? "#3f3f46" : "#e2e8f0",
    dockIconColor: isDarkMode ? "#f8fafc" : "#1e293b",
    pillBg: isDarkMode ? "#27272a" : "#f1f5f9",
    pillText: isDarkMode ? "#e4e4e7" : "#1e293b",
    inputBg: isDarkMode ? "#18181b" : "#f8fafc",
    inputBorder: isDarkMode ? "#3f3f46" : "#e2e8f0",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if rendered outside provider
    const isDarkMode = false;
    return {
      isDarkMode,
      toggleTheme: () => {},
      colors: {
        background: "#f8fafc",
        cardBackground: "#ffffff",
        cardBorder: "#e2e8f0",
        textPrimary: "#0f172a",
        textSecondary: "#475569",
        textMuted: "#64748b",
        dockBackground: "rgba(255, 255, 255, 0.96)",
        dockBorder: "#e2e8f0",
        dockButtonBg: "#f1f5f9",
        dockButtonBorder: "#e2e8f0",
        dockIconColor: "#1e293b",
        pillBg: "#f1f5f9",
        pillText: "#1e293b",
        inputBg: "#f8fafc",
        inputBorder: "#e2e8f0",
      },
    };
  }
  return context;
}

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import i18n from "../translate";
import baseTheme from "../theme"; // همون theme.ts که پالت رو داری

type ThemeContextType = { mode: "light" | "dark"; toggle: () => void };
const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("mode") as "light" | "dark") || "light"
  );

  const [lng, setLng] = useState<string>(i18n.language || "en");
  useEffect(() => {
    const onLang = (l: string) => setLng(l);
    i18n.on("languageChanged", onLang);
    return () => i18n.off("languageChanged", onLang);
  }, []);
  const direction = i18n.dir(lng) as "rtl" | "ltr";

  // ست کردن dir/lang روی html
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", lng);
  }, [direction, lng]);

  // فقط rtlPlugin (بدون prefixer)
  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "mui-rtl" : "mui",
        stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
      }),
    [direction]
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: {
          ...baseTheme.palette,
          mode,
          background:
            mode === "light"
              ? baseTheme.palette.background
              : { default: "#0D1B2A", paper: "#1B2430" },
          text:
            mode === "light"
              ? {
                  primary: "#003464",
                  secondary: baseTheme.palette.text?.secondary ?? "#62707C",
                }
              : { primary: "#F3F4F7", secondary: "#A7B3BF" },
        },
        typography: {
          fontFamily: `'Vazirmatn', 'Roboto', sans-serif`,
        },
        shape: { borderRadius: 12 },
      }),
    [direction, mode]
  );

  const toggle = () => {
    const nm = mode === "light" ? "dark" : "light";
    setMode(nm);
    localStorage.setItem("mode", nm);
  };

  return (
    <CacheProvider value={cache}>
      <ThemeModeContext.Provider value={{ mode, toggle }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
};

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used inside AppThemeProvider");
  return ctx;
}

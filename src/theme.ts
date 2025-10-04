import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#98DBF1",  // 200
      main: "#009CDB",   // 500
      dark: "#10598E",   // 700
      contrastText: "#fff",
    },
    error: {
      light: "#E57373",  // 300
      main: "#F44336",   // 500
      dark: "#D32F2F",   // 700
      contrastText: "#fff",
    },
    warning: {
      light: "#FFB74D",  // 300
      main: "#FF9800",   // 500
      dark: "#F57C00",   // 700
      contrastText: "#000",
    },
    success: {
      light: "#81C784",  // 300
      main: "#4CAF50",   // 500
      dark: "#388E3C",   // 700
      contrastText: "#fff",
    },
    info: {
      light: "#64B5F6",  // 300
      main: "#2196F3",   // 500
      dark: "#1976D2",   // 700
      contrastText: "#fff",
    },
    grey: {
      50: "#FFFFFF",
      100: "#F5F9FC",
      200: "#E1E9EE",
      300: "#CDD9E0",
      400: "#AFBCC4",
      500: "#8895A0",
      600: "#62707C",
      700: "#3D4852",
      800: "#25262E",
      900: "#1C1B22",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#25262E",
      secondary: "#62707C",
      

    },
  },
});

export default theme;


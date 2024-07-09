import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#143946',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
});

export default theme;

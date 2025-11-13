import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff80ab',
    },
    warning: {
      main: '#6f3000',
    },
    info: {
      main: '#6200ea',
    },
    background: {
      default: '#f1d4d7',
    },
    error: {
      main: '#ff0000',
    },
    success: {
      main: '#2e7d32',
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
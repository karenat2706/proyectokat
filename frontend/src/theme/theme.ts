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
      main: '#82e8b6',
    },
  },
};


//Crea el tema a partir de las opciones
const theme = createTheme(themeOptions);

// Exporta el tema como valor por defecto
export default theme;
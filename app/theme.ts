import { createTheme } from '@mui/material/styles';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin', 'latin-ext'] });

declare module '@mui/material/styles' {
  interface PaletteColor {
    success?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#C2EC7E',
    },
    primary: {
      main: '#31425f',
    },
    secondary: {
      main: '#f46523',
    },
    warning: {
      main: '#f46523',
    },
    error: {
      main: '#f46523',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    allVariants: raleway.style,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;

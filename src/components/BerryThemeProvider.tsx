'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@/themes';

interface BerryThemeProviderProps {
  children: React.ReactNode;
}

export default function BerryThemeProvider({ children }: BerryThemeProviderProps) {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

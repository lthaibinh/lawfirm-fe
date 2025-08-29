import { useMemo, ReactNode } from 'react';

// material-ui
import { createTheme as createThemeMUI, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// project imports
import useConfig from '@/hooks/useConfig';
import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor } = useConfig();

  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography = useMemo(() => Typography(theme, borderRadius, fontFamily), [theme, borderRadius, fontFamily]);
  const themeCustomShadows = useMemo(() => customShadows(mode, theme), [mode, theme]);

  const themeOptions = useMemo(
    () => ({
      direction: 'ltr' as const,
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows
    }),
    [theme, themeCustomShadows, themeTypography]
  );

  const themes = createThemeMUI(themeOptions);
  themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius, outlinedFilled), [themes, borderRadius, outlinedFilled]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

// Export createTheme function for standalone use
export function createTheme() {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor } = useConfig();

  const theme = Palette(mode, presetColor);
  const themeTypography = Typography(theme, borderRadius, fontFamily);
  const themeCustomShadows = customShadows(mode, theme);

  const themeOptions = {
    direction: 'ltr' as const,
    palette: theme.palette,
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography,
    customShadows: themeCustomShadows
  };

  const themes = createThemeMUI(themeOptions);
  themes.components = componentStyleOverrides(themes, borderRadius, outlinedFilled);

  return themes;
}

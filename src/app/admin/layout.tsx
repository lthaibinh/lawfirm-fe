'use client';

import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import BerryThemeProvider from '@/components/BerryThemeProvider';
import BerryConfigProvider from '@/components/BerryConfigProvider';
import Footer from '@/layout/MainLayout/Footer';
import Header from '@/layout/MainLayout/Header/index';
import Sidebar from '@/layout/MainLayout/Sidebar';
import MainContentStyled from '@/layout/MainLayout/MainContentStyled';
import Customization from '@/layout/Customization';
import Loader from '@/ui-component/Loader';
import Breadcrumbs from '@/ui-component/extended/Breadcrumbs';

import useConfig from '@/hooks/useConfig';

// ==============================|| ADMIN LAYOUT ||============================== //

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { borderRadius, miniDrawer } = useConfig();
  const drawerOpen = true; // Simplified for Next.js

  useEffect(() => {
    // Handle drawer state for mobile
    if (downMD) {
      // Close drawer on mobile
    }
  }, [downMD]);

  return (
    <BerryConfigProvider>
      <BerryThemeProvider>
        <Box sx={{ display: 'flex' }}>
          {/* header */}
          <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
            <Toolbar sx={{ p: 2 }}>
              <Header />
            </Toolbar>
          </AppBar>

          {/* menu / drawer */}
          <Sidebar />

          {/* main content */}
          <MainContentStyled {...{ borderRadius, open: drawerOpen }}>
            <Box sx={{ ...{ px: { xs: 0 } }, minHeight: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column' }}>
              {/* breadcrumb */}
              <Breadcrumbs />
              {children}
              <Footer />
            </Box>
          </MainContentStyled>
          <Customization />
        </Box>
      </BerryThemeProvider>
    </BerryConfigProvider>
  );
}

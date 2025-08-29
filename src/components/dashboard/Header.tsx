'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { IconMenu2, IconUser, IconLogout } from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 240px)` },
        ml: { md: '240px' },
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
          >
            <IconMenu2 size={20} />
          </IconButton>
        )}
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <IconUser size={16} />
            </Avatar>
          </IconButton>
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          id="primary-search-account-menu"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <IconUser size={16} style={{ marginRight: 8 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <IconLogout size={16} style={{ marginRight: 8 }} />
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Back to Main Site
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

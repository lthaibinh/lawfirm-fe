'use client';

import { useGetMenuMaster, handlerDrawerOpen, handlerActiveItem } from '@/api/menu';
import { Button, Box, Typography, Paper } from '@mui/material';

export function SWRTest() {
  const { menuMaster, menuMasterLoading, menuMasterError } = useGetMenuMaster();

  const handleToggleDrawer = () => {
    handlerDrawerOpen(!menuMaster?.isDashboardDrawerOpened);
  };

  const handleChangeActiveItem = () => {
    const newItem = menuMaster?.openedItem === 'dashboard' ? 'analytics' : 'dashboard';
    handlerActiveItem(newItem);
  };

  if (menuMasterLoading) {
    return <Typography>Loading menu state...</Typography>;
  }

  if (menuMasterError) {
    return <Typography color="error">Error loading menu state: {menuMasterError.message}</Typography>;
  }

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        SWR Menu State Test
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          Current Drawer State: {menuMaster?.isDashboardDrawerOpened ? 'Open' : 'Closed'}
        </Typography>
        <Typography variant="body1">
          Active Item: {menuMaster?.openedItem}
        </Typography>
        <Typography variant="body1">
          Component Drawer: {menuMaster?.isComponentDrawerOpened ? 'Open' : 'Closed'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleToggleDrawer}
        >
          Toggle Drawer
        </Button>
        
        <Button 
          variant="contained" 
          onClick={handleChangeActiveItem}
        >
          Change Active Item
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Raw State: {JSON.stringify(menuMaster, null, 2)}
        </Typography>
      </Box>
    </Paper>
  );
}

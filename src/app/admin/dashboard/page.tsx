'use client';

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
// project imports
import EarningCard from '@/views/dashboard/Default/EarningCard';
import PopularCard from '@/views/dashboard/Default/PopularCard';
import TotalOrderLineChartCard from '@/views/dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeLightCard from '@/ui-component/cards/TotalIncomeLightCard';
import TotalIncomeDarkCard from '@/ui-component/cards/TotalIncomeDarkCard';
import TotalGrowthBarChart from '@/views/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from '@/store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={gridSpacing}>
        {/* First row */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <EarningCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <TotalOrderLineChartCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
              <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 12 }}>
                  <TotalIncomeDarkCard />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 12 }}>
                  <TotalIncomeLightCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Second row */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TotalGrowthBarChart />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <PopularCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

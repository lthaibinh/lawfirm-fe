// assets
import { IconDashboard } from '@tabler/icons-react';

// types
interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'group';
  url?: string;
  icon?: any;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}

interface MenuGroup {
  id: string;
  title: string;
  type: 'group';
  children: MenuItem[];
}

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: MenuGroup = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

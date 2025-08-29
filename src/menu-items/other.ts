// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// types
interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'group';
  url?: string;
  icon?: any;
  breadcrumbs?: boolean;
  external?: boolean;
  target?: boolean;
  children?: MenuItem[];
}

interface MenuGroup {
  id: string;
  type: 'group';
  children: MenuItem[];
}

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: MenuGroup = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;

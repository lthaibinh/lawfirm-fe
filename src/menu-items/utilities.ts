// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import { IconKey } from '@tabler/icons-react';

// types
interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapse';
  url?: string;
  icon?: any;
  breadcrumbs?: boolean;
  target?: boolean;
  children?: MenuItem[];
}

interface MenuGroup {
  id: string;
  title: string;
  caption?: string;
  icon?: any;
  type: 'group';
  children: MenuItem[];
}

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const management: MenuGroup = {
  id: 'Management',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'account',
      title: 'Account',
      type: 'collapse',
      icon: IconKey,
      children: [
        {
          id: 'create-account',
          title: 'create',
          type: 'item',
          url: '/admin/account/create',
          target: false
        },
        {
          id: 'list-account',
          title: 'list',
          type: 'item',
          url: '/admin/account/list',
          target: false
        },
      ]
    },
    {
      id: 'post',
      title: 'Post',
      type: 'collapse',
      icon: IconKey,
      children: [
        {
          id: 'create-post',
          title: 'create',
          type: 'item',
          url: '/admin/post/create',
          target: false
        },
        {
          id: 'list-post',
          title: 'list',
          type: 'item',
          url: '/admin/post/list',
          target: false
        },
      ]
    }
  ]
};

export default management;

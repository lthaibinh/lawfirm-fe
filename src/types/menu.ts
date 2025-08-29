export interface MenuMasterState {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;
  isDashboardDrawerOpened: boolean;
  isComponentDrawerOpened: boolean;
}

export interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  url?: string;
  link?: string;
  icon?: React.ComponentType<any>;
  target?: string;
  disabled?: boolean;
  chip?: {
    label: string;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant: 'filled' | 'outlined';
    size: 'small' | 'medium' | 'large';
    avatar?: string;
  };
  caption?: string;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}

export interface MenuGroup {
  id: string;
  title: string;
  type: 'group';
  children: MenuItem[];
  caption?: string;
}

export interface MenuEndpoints {
  key: string;
  master: string;
  dashboard: string;
}


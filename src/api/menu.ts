import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { MenuMasterState } from '@/types/menu';

const initialState: MenuMasterState = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
} as const;

// Custom fetcher for menu data that returns the initial state
const menuFetcher = () => Promise.resolve(initialState);

export function useGetMenuMaster() {
  const { data, isLoading, error } = useSWR<MenuMasterState>(
    endpoints.key + endpoints.master, 
    menuFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: initialState, // Provide fallback data
      refreshInterval: 0, // Disable auto refresh
    }
  );

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data || initialState,
      menuMasterLoading: isLoading,
      menuMasterError: error
    }),
    [data, isLoading, error]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean): void {
  console.log('handlerDrawerOpen called with:', isDashboardDrawerOpened);
  
  // Update local state based on key
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuMasterState | undefined) => {
      if (!currentMenuMaster) return { ...initialState, isDashboardDrawerOpened };
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    {
      revalidate: false, // Don't revalidate from server
      populateCache: true, // Update the cache
    }
  );
}

export function handlerActiveItem(openedItem: string): void {
  console.log('handlerActiveItem called with:', openedItem);
  
  // Update local state based on key
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuMasterState | undefined) => {
      if (!currentMenuMaster) return { ...initialState, openedItem };
      return { ...currentMenuMaster, openedItem };
    },
    {
      revalidate: false, // Don't revalidate from server
      populateCache: true, // Update the cache
    }
  );
}

// Helper function to get current menu state
export function getCurrentMenuState(): MenuMasterState {
  // This is a synchronous way to get the current state from SWR cache
  // Note: This might not always be available, so we return initialState as fallback
  return initialState;
}

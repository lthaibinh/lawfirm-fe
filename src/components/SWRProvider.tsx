'use client';

import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: React.ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global fetcher function
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        // Global error retry count
        errorRetryCount: 3,
        // Global error retry interval
        errorRetryInterval: 5000,
        // Focus revalidation
        revalidateOnFocus: false,
        // Reconnect revalidation
        revalidateOnReconnect: false,
        // Deduplication interval
        dedupingInterval: 2000,
        // Keep previous data when revalidating
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}

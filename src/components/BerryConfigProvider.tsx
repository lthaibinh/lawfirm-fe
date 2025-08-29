'use client';

import { ConfigProvider } from '@/contexts/ConfigContext';

interface BerryConfigProviderProps {
  children: React.ReactNode;
}

export default function BerryConfigProvider({ children }: BerryConfigProviderProps) {
  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  );
}

import { createContext, ReactNode } from 'react';

// project imports
import defaultConfig from '@/config';
import useLocalStorage from '@/hooks/useLocalStorage';

// types
interface ConfigContextType {
  fontFamily: string;
  borderRadius: number;
  onChangeFontFamily: (fontFamily: string) => void;
  onChangeBorderRadius: (event: any, newValue: number) => void;
  onReset: () => void;
}

interface ConfigProviderProps {
  children: ReactNode;
}

// initial state
const initialState: ConfigContextType = {
  ...defaultConfig,
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onReset: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext<ConfigContextType>(initialState);

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('berry-config-vite-ts', {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius
  });

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  const onChangeBorderRadius = (event: any, newValue: number) => {
    setConfig({
      ...config,
      borderRadius: newValue
    });
  };

  const onReset = () => {
    setConfig({ ...defaultConfig });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeFontFamily,
        onChangeBorderRadius,
        onReset
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

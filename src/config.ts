export const DASHBOARD_PATH = '/admin/dashboard';

interface Config {
  fontFamily: string;
  borderRadius: number;
  mode: 'light' | 'dark';
  outlinedFilled: boolean;
  presetColor: 'default';
}

const config: Config = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  mode: 'light',
  outlinedFilled: false,
  presetColor: 'default'
};

export default config;

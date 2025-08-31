import Link from 'next/link';

// material-ui
import MuiLink from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from '@/config';
import Logo from '@/ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection(): JSX.Element {
  return (
    <MuiLink component={Link} href={DASHBOARD_PATH} aria-label="theme-logo">
      <Logo />
    </MuiLink>
  );
}

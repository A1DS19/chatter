import { Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { router } from '../Routes';

interface IBrandingProps {}

export function Branding({}: IBrandingProps) {
  return (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        onClick={() => router.navigate('/')}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        CHATTER
      </Typography>
    </>
  );
}

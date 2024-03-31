import { Typography } from '@mui/material';
import { router } from '../Routes';

interface IMobileBrandingProps {}

export function MobileBranding({}: IMobileBrandingProps) {
  return (
    <>
      <Typography
        variant='h5'
        noWrap
        component='a'
        href='/'
        onClick={() => router.navigate('/')}
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
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

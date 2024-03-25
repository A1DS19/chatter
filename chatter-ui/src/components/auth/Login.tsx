import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { Link as MUILink } from '@mui/material';

export function Login() {
  return (
    <>
      <Auth submitLabel='Login' onSubmit={async () => {}}>
        <Link to='/sign-up' style={{ alignSelf: 'center' }}>
          <MUILink>Sign Up</MUILink>
        </Link>
      </Auth>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { Link as MUILink } from '@mui/material';

export function SignUp() {
  return (
    <>
      <Auth submitLabel='Signup' onSubmit={async () => {}}>
        <Link to='/login' style={{ alignSelf: 'center' }}>
          <MUILink>Login</MUILink>
        </Link>
      </Auth>
    </>
  );
}

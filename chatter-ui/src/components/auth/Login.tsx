import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { Link as MUILink } from '@mui/material';
import { useLogin } from '../../hooks/useLogin';

export function Login() {
  const { error, login } = useLogin();

  const handleOnSubmit = (email: string, password: string) => {
    login({ email, password });
  };

  return (
    <>
      <Auth
        submitLabel='Login'
        onSubmit={(email, password) => handleOnSubmit(email, password)}
        error={error as string}
      >
        <Link to='/sign-up' style={{ alignSelf: 'center' }}>
          <MUILink>Sign Up</MUILink>
        </Link>
      </Auth>
    </>
  );
}

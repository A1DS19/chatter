import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { Link as MUILink, TextField } from '@mui/material';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useState } from 'react';
import { extractErrorMessage } from '../../utils/errors';
import { useLogin } from '../../hooks/useLogin';

export function SignUp() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const { login } = useLogin();

  return (
    <>
      <Auth
        error={error as string}
        submitLabel='Signup'
        extraFields={[
          <TextField
            type='text'
            label='Username'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
            helperText={error}
          />,
        ]}
        onSubmit={async (email, password) => {
          try {
            await createUser({
              variables: {
                createUserInput: {
                  email,
                  password,
                  username,
                },
              },
            });
            await login({
              email,
              password,
            });
            setError(null);
          } catch (error) {
            const errorMessage = extractErrorMessage(error);
            if (errorMessage) {
              setError(errorMessage);
            }
          }
        }}
      >
        <Link to='/login' style={{ alignSelf: 'center' }}>
          <MUILink>Login</MUILink>
        </Link>
      </Auth>
    </>
  );
}

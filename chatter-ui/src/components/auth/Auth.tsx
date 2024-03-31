import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';

interface IAuthProps {
  submitLabel: string;
  onSubmit: (email: string, password: string) => any;
  children: React.ReactNode;
  error?: string;
}

export function Auth({ onSubmit, submitLabel, children, error }: IAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.me) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          height: '100vh',
          maxWidth: {
            xs: '100%',
            sm: '50%',
            md: '30%',
          },
          margin: '0 auto',
          justifyContent: 'center',
        }}
      >
        <TextField
          type='email'
          label='Email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          type='password'
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button variant='contained' onClick={() => onSubmit(email, password)}>
          {submitLabel}
        </Button>
        {children}
      </Stack>
    </>
  );
}

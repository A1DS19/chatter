import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

interface IAuthProps {
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  children: React.ReactNode;
}

export function Auth({ onSubmit, submitLabel, children }: IAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        />
        <TextField
          type='password'
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='contained' onClick={() => onSubmit(email, password)}>
          {submitLabel}
        </Button>
        {children}
      </Stack>
    </>
  );
}

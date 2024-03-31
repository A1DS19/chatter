import { useState } from 'react';
import { API_URL } from '../constants/urls';
import { client } from '../constants/apollo-client';

export interface LoginRequest {
  email: string;
  password: string;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);

  const login = async (req: LoginRequest) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      setError('Invalid email or password');
      return;
    }

    setError(null);

    await client.refetchQueries({
      include: 'active',
    });
  };

  return { login, error };
}

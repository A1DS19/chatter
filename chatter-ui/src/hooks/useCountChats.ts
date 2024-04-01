import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOW_ERROR } from '../constants/errors';

export function useCountChats() {
  const [count, setCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const response = await fetch(`${API_URL}/chats/count`);

    if (!response.ok) {
      snackVar({ message: UNKNOW_ERROR, severity: 'error' });
    }

    const data = await response.json();
    setCount(parseInt(data));
  }, []);

  return { count, countChats };
}

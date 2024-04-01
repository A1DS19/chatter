import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOW_ERROR } from '../constants/errors';

export function useCountMessages(chatId: string) {
  const [count, setCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const response = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);

    if (!response.ok) {
      snackVar({ message: UNKNOW_ERROR, severity: 'error' });
    }

    const data = await response.json();
    const { messages } = data?.messages;
    setCount(messages);
  }, [chatId]);

  return { count, countMessages };
}

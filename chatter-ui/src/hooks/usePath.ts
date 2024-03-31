import { useEffect, useState } from 'react';
import { router } from '../components/Routes';

export function usePath() {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    router.subscribe((state) => {
      setPath(state.location.pathname);
    });
  }, []);

  return { path };
}

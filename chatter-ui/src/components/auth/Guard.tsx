import { useEffect } from 'react';
import { excludedRoutes } from '../../constants/excluded-routes';
import { useGetMe } from '../../hooks/useGetMe';
import { authenticatedVar } from '../../constants/authenticated';
import { Box } from '@mui/material';

interface IGuardProps {
  children: JSX.Element | JSX.Element[];
}

export function Guard({ children }: IGuardProps): JSX.Element {
  const { data: currentUser } = useGetMe();

  useEffect(() => {
    if (currentUser) {
      authenticatedVar(true);
    }
  }, [currentUser]);

  if (!excludedRoutes.includes(window.location.pathname) && !currentUser) {
    return <></>;
  }

  return <Box>{children}</Box>;
}

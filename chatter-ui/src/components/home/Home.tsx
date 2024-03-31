import { useEffect } from 'react';
import { snackVar } from '../../constants/snack';
import { useGetMe } from '../../hooks/useGetMe';

interface IHomeProps {}

export function Home({}: IHomeProps) {
  const { data } = useGetMe();

  useEffect(() => {
    snackVar({
      message: `Welcome ${data?.me?.email}`,
      severity: 'info',
    });
  }, []);

  return <>home</>;
}

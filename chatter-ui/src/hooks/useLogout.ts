import { API_URL } from '../constants/urls';

export function useLogout() {
  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
}

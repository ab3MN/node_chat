import { getUserById } from '@/api/users.api';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { User } from '@/types/User';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const { getItem } = useLocaLStorage('user');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const isAuth = useCallback(async () => {
    const user = getItem() as User | null;

    if (user) {
      try {
        const isUserExist = !!(await getUserById(user.id));
        setIsAuthenticated(isUserExist);
      } catch {
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, [getItem]);

  useEffect(() => {
    isAuth();
  }, [isAuth]);

  return { isAuthenticated, loading };
};

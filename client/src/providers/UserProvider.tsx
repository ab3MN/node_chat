import { getUserById, signIn, signUp } from '@/api/users.api';
import { UserContext } from '@/context/UserContext';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { User } from '@/types/User';
import notification from '@/utils/notification';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const { setItem, removeItem, getItem } = useLocaLStorage('user');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const storagedUser = getItem() as User | null;

  const { data, isLoading, error } = useQuery<User | null, Error>({
    queryKey: ['user', storagedUser?.id],
    queryFn: () => (storagedUser?.id ? getUserById(storagedUser.id) : Promise.resolve(null)),
    enabled: !user && !!storagedUser?.id,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setItem(data);
    }
  }, [data, setItem]);

  const isAuthenticated = !!user || (!!data && !error);

  const handleAuth = useCallback(
    async (name: string, authFn: (name: string) => Promise<User>) => {
      try {
        const newUser = await authFn(name);
        setUser(newUser);
        setItem(newUser);
        navigate('/chat');
      } catch (err) {
        notification('error', err as string);
      }
    },
    [setItem, navigate],
  );

  const handleSignIn = useCallback((name: string) => handleAuth(name, signIn), [handleAuth]);
  const handleSignUp = useCallback((name: string) => handleAuth(name, signUp), [handleAuth]);

  const handleLogOut = useCallback(() => {
    removeItem();
    setUser(null);
    navigate('/signIn');
  }, [removeItem, navigate]);

  const store = useMemo(() => ({ user, isAuthenticated, isLoading }), [user, isAuthenticated, isLoading]);

  return (
    <UserContext.Provider value={{ ...store, handleSignIn, handleSignUp, handleLogOut }}>
      {children}
    </UserContext.Provider>
  );
};

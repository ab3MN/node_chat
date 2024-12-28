import { signIn, signUp } from '@/api/users.api';
import { UserContext } from '@/context/UserContext';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { User } from '@/types/User';
import notification from '@/utils/notification';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const { setItem, removeItem } = useLocaLStorage('user');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const store = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={{ ...store, handleSignIn, handleSignUp, handleLogOut }}>
      {children}
    </UserContext.Provider>
  );
};

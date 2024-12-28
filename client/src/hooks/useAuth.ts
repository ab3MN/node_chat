import { getUserById } from '@/api/users.api';
import { UserContext } from '@/context/UserContext';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useAuth = () => {
  const { getItem } = useLocaLStorage('user');
  const { user } = useContext(UserContext);
  const storagedUser = getItem() as User | null;

  const { data, isLoading, error } = useQuery<User | null, Error>({
    queryKey: ['user', storagedUser?.id],
    queryFn: () => (storagedUser?.id ? getUserById(storagedUser.id) : Promise.resolve(null)),
    enabled: !user && !!storagedUser?.id,
  });

  const isAuthenticated = !!user || (!!data && !error);

  return { isAuthenticated, isLoading };
};

import { getUserById } from '@/api/users.api';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { getItem } = useLocaLStorage('user');
  const user = getItem() as User | null;

  const { data, isLoading, error } = useQuery<User | null, Error>({
    queryKey: ['user', user?.id],
    queryFn: () => (user?.id ? getUserById(user.id) : Promise.resolve(null)),
    enabled: !!user?.id,
  });

  const isAuthenticated = !!data && !error;

  return { isAuthenticated, isLoading };
};

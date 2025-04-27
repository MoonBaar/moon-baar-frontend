import {useQuery} from '@tanstack/react-query';
import {baseAPI, baseURL} from '../instance';
import {useAuthStore, User} from '@/store/user';
import {useEffect} from 'react';

export const loginOauth = (provider: 'kakao' | 'naver') => {
  window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
};

const fetchUser = async (): Promise<User> => {
  const response = await baseAPI.get('/users/me');
  return response.data;
};

export const useGetUser = () => {
  const {setUser} = useAuthStore();

  const query = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isSuccess, query.isError, setUser]);

  return query;
};

export const logout = async () => {
  try {
    await baseAPI.post('/users/logout');
  } catch (e) {
    console.error('Logout API failed', e);
  } finally {
    window.location.href = '/login';
    useAuthStore.getState().setUser(null);
  }
};

export const deleteUser = async () => {
  try {
    await baseAPI.delete('/users/me');
  } catch (e) {
    throw e;
  } finally {
    window.location.href = '/login';
    useAuthStore.getState().setUser(null);
  }
};

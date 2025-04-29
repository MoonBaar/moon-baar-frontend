import {useGetUser} from '@/apis/api/users';
import {useAuthStore} from '@/store/user';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
  useGetUser();
  const {user, isGuest} = useAuthStore();

  if (isGuest) return <Outlet />;

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;

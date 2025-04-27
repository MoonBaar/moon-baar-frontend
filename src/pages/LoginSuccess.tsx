import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGetUser} from '@/apis/api/users';

function LoginSuccess() {
  const {isSuccess, isError} = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }

    if (isError) {
      navigate('/login');
    }
  }, [isSuccess, isError]);

  return <div>로그인 중입니다...</div>;
}

export default LoginSuccess;

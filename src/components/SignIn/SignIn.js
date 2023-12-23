import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SignIn({ isLogedin }) {
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = isLogedin;

    if (isAuthenticated) {
      history.push('/'); 
    }
  }, [isLogedin, history]);

  // Если пользователь авторизован, не отрисовываем компонент
  return isLogedin ? null : (
    <div>
      {/* Ваш компонент авторизации */}
    </div>
  );
}

export default SignIn;

import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser && !currentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
      setIsRestoring(false); // Устанавливаем, что завершили восстановление
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isRestoring) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser, isRestoring]);

  const updateCurrentUser = (userData) => {
    setCurrentUser((prevUser) => {
      if (!prevUser || prevUser._id !== userData._id) {
        return userData;
      }
      return prevUser;
    });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};

import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const login = (name = '', userClass, profileData = '') => {
    const data = JSON.parse(profileData);
    const user = { id: 'abc', name, userClass, data };
    const action = {
      type: types.login,
      payload: user,
    };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(action);
  };
  const logout = () => {
    const action = {
      type: types.logout,
    };
    localStorage.removeItem('user');
    dispatch(action);
  };
  return (
    <AuthContext.Provider
      value={{ ...authState, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
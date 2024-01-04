import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import { LoadingToRedirect } from './isLoadingToRedirect';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
};

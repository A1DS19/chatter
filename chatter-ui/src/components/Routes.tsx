import { createBrowserRouter } from 'react-router-dom';
import { Login } from './auth/Login';
import { SignUp } from './auth/SignUp';
import { Home } from './home/Home';
import { Chat } from './chat/Chat';
import { Profile } from './profile/Profile';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat/:_id',
    element: <Chat />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

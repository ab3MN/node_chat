import ProtectedRoute from './ProtectedRoute';
import { ChatPage, SignInPage, SignUpPage } from './routes';

export const protectedRoutes = {
  chat: (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  ),
  signin: (
    <ProtectedRoute>
      <SignInPage />
    </ProtectedRoute>
  ),
  signup: (
    <ProtectedRoute>
      <SignUpPage />
    </ProtectedRoute>
  ),
};

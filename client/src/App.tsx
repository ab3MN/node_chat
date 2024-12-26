import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Loader } from './components/Loader/Loader';
import { protectedRoutes } from './routing/ProtectedRoutes';
import { ChatPage, NotFoundPage } from './routing/routes';
import { ChatForm } from './components/Chat/ChatForm';

export const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={protectedRoutes.chat} />

        <Route path='/signin' element={protectedRoutes.signin} />
        <Route path='/signup' element={protectedRoutes.signup} />

        <Route path='/chat' element={protectedRoutes.chat}>
          <Route path=':chatid?' element={<ChatPage />} />
          <Route path='create' element={<ChatForm />} />
          <Route index element={<div>No selected chat</div>} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

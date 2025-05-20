import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Login } from './pages/auth/Login/Login';
import { Player } from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        console.log('Logged In' + user);
        navigate('/');
      } else {
        console.log('Logged Out');
        navigate('/login');
      }
    });
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
};

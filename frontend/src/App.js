import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import PrivateRouter from './utils/PrivateRouter';
import Header from './components/header/Header';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { useSelector } from 'react-redux';
import { useActions } from './hooks/useActions';
import { useEffect, useState } from 'react';

function App() {
  const [start, setStart] = useState(true)
  const { AuthTokens } = useSelector(state => state.user)
  const { updateToken, setAuthData, clearAuthData } = useActions()
  const navigate = useNavigate()
  useEffect(() => {

    const updateUser = async () => {
      await updateToken(AuthTokens).unwrap()
        .then((originalPromiseResult) => {
          setAuthData(originalPromiseResult)
        })
        .catch((rejectedValueOrSerializedError) => {
          clearAuthData()
          navigate('/login')
        })
    }

    if (start && AuthTokens) {
      updateUser()
      setStart(false)
    }

    const five_minutes = 1000 * 60 * 5
    let interval = setInterval(() => {
      if (AuthTokens) {
        updateUser()
      }
    }, five_minutes)
    return () => clearInterval(interval)
  }, [AuthTokens])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRouter>
              <MainPage />
            </PrivateRouter>
          }
        />
        <Route element={<LoginPage />} path='/login' />
        <Route element={<RegisterPage />} path='/register' />
      </Routes>
    </>
  );
}

export default App;

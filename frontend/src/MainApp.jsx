import { Navigate, Route, Routes, Link } from 'react-router-dom';


import { Navbar } from './app/public/component/Navbar';
import { AuthProvider } from './auth/context';
import { AppRouter } from './routes/AppRoute';


export const MainApp = () => {
  return (
    <AuthProvider>
      <div className='content'>
          <Navbar />
          <hr />
          <AppRouter />
        </div>
    </AuthProvider>
  )
}
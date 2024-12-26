import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../auth/pages/Login';
import { HomePage } from '../app/public/component/HomePage';
import { Contact } from '../app/public/component/Contact';
import { Simulador } from '../app/simulador/component/Simulador';



export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={ <HomePage />}></Route>
            <Route path="/simulador" element={
                <PrivateRoute>
                    <Simulador />
                </PrivateRoute>
            } />
            <Route path='/contact' element={ <Contact /> }></Route>
            <Route path='/login/*' element={ 
                <PublicRoute>
                    <Login />
                </PublicRoute> 
            } />
        </Routes>
    
    </>
  )
}
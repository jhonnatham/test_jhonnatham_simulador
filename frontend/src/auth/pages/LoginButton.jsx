import { NavLink } from 'react-router-dom';

export const  LoginButton = () => {
  return (
    <NavLink 
        className={ ({ isActive }) => `nav-link  ${ isActive ? 'active' : '' }`}
        to="/login">
        Login
    </NavLink>
  )
}
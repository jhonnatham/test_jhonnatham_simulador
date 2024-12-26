import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext, LoginButton, LogoutButton } from '../../../auth';


export const Navbar = () => {

    const { logged } = useContext( AuthContext );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">Demo Simulador</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <NavLink 
                            className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}
                            to="/simulador">
                            Simulador
                        </NavLink>

                        <NavLink 
                            className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}
                            to="/contact">
                            Contacto
                        </NavLink>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        { !logged
                            ? <LoginButton />
                            : <LogoutButton />
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

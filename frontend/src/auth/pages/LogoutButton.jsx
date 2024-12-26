import { useContext } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";


export const LogoutButton = () => {
    const { user, logout } = useContext( AuthContext );

    const navigate = useNavigate()
    const onLogout = () => {
        logout();
        navigate('/', {
            replace: true
        })
    }
    return (
        <>
            <span className="nav-item nav-link text-primary">
                { user?.email }
            </span>

            <button
                className="nav-item nav-link btn"
                onClick={ onLogout }
            >
                Logout
            </button>
        </>
    )
}

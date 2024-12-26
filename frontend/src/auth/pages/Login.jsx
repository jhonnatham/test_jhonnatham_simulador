import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from '../context/AuthContext'
import { useContext } from "react";

export const Login = () => {

    const urlBase = import.meta.env.VITE_APP_ENDPOINT

    const { login } = useContext( AuthContext )
    const navigate = useNavigate()
    const { formState, onInputChange, onResetForm} = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formState

    const onLogin = async (e) => {
        e.preventDefault()
        if (email.trim() == '' || password.trim() == '') {
            alert('Email y contraseña son obligatorios')
            return false
        }

        const response = await fetch(`${urlBase}api/users/validate`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
        })
        if (response.status != 200) {
            const errores = await response.json()
            alert(errores.error)
            return false
        }
        const data = await response.json()

        login(email, data.token)

        navigate('/simulador', {
            replace:true
        })
    }

    const onRegister = async (e) => {
        e.preventDefault()
        if (email.trim() == '' || password.trim() == '') {
            alert('Email y contraseña son obligatorios')
            return false
        }

        const response = await fetch(`${urlBase}api/users/create`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
        })

        if (response.status != 201) {
            const errores = await response.json()
            alert(errores.error)
            return false
        }

        alert("Usuario registrado, Ya puedes iniciar sesión!!")
        onResetForm()
    }

    return (
        <div className="d-flex justify-content-center ">
            <form className="p-4 bg-light rounded" onSubmit={onLogin}>
                <div className="form-group pb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={ email } onChange={ onInputChange }/>
                </div>
                <div className="form-group pb-4">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Contraseña" value={ password } onChange={ onInputChange }/>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary">Autenticar</button>
                    <a className="btn btn-default" onClick={ onRegister }>Registrar</a>
                </div>
            </form>
        </div>
    )
}
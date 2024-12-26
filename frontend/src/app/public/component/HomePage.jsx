import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../../auth";

export const HomePage = () => {
  const { user } = useContext( AuthContext );
  return (
    <div className="jumbotron p-2">
      <h1 className="pb-3">Simulador financiero</h1>
      <div className="row">
        <div className="col-8">
          <p>Los simuladores o modelos financieros son herramientas que ayudan a las personas a orientar su control financiero y tomar decisiones más estratégicas, por lo que son especialmente útiles para organizar tus financias.</p>
          <p className="pt-2"><NavLink className="btn btn-primary" to={ user == null ? '/login' : '/simulador' } role="button">Simulador</NavLink></p>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <i className="bi bi-info-circle icon-info"></i>
        </div>
      </div>
    </div>
  )
}
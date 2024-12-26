import { useState, useEffect, useCallback, useContext } from "react"
import { Create } from "../../simulador/component/Create"
import { ListSimulaciones } from "./ListSimulaciones"
import { AuthContext } from "../../../auth"
import { Update } from "./Update"

export const Simulador = () => {

  const urlBase = import.meta.env.VITE_APP_ENDPOINT

  const { user, logout } = useContext( AuthContext );
  const [ simulaciones, setsimulaciones ] = useState([])
  const [ update, setupdate ] = useState(false)
  const { token } = user

  const fetchSimulaciones  = async () => {

    try {
      const response = await fetch(`${urlBase}api/simulaciones/`,
        {
            method: 'GET',
            headers: {
              'Authorization': token
            }
        }
      )

      if (response.status == 401) {
        alert('Su sesion ha expirado!!')
        logout()
      }

      const data = await response.json()
      setsimulaciones(data)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  useEffect( () => {
    fetchSimulaciones()
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`${urlBase}api/simulaciones/${id}`, 
      { 
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      }
    )
    if (response.status != 200) {
      const errores = await response.json()
      // TODO componente mostrrar errores
      console.log(errores)
      return false
    }
    setupdate(false)
    fetchSimulaciones()
  }

  const handleUpdate = async (id) => {
    const response = await fetch(`${urlBase}api/simulaciones/${id}`, 
      { 
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }
    )
    if (response.status != 200) {

      if (response.status == 401) {
        alert('Su sesion ha expirado!!')
        logout()
      }
      
      const errores = await response.json()
      // TODO componente mostrrar errores
      console.log(errores)
      return false
    }
    const data = await response.json()
    setupdate(data)
  }

  return (
    <>
      <div className='content_body border border-1 rounded'>
        <h1>Simulador financiero </h1>
        <hr/>
        {
          !update
          ? <Create fetchSimulaciones={ fetchSimulaciones } />
          : <Update dataUpdate={ update } fetchSimulaciones={ fetchSimulaciones } setupdate={ setupdate } />
        }
        
        <br></br>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha simulacion</th>
              <th scope="col">Monto</th>
              <th scope="col">Término pago</th>
              <th scope="col">Fecha inicio</th>
              <th scope="col">Fecha fin</th>
              <th scope="col">Tasa</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <ListSimulaciones 
              simulaciones={ simulaciones }
              handleDelete={ handleDelete }
              handleUpdate={ handleUpdate }
            />
          </tbody>
        </table>
      </div>
    </>
  )
}
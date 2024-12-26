import { useState, useContext } from "react"
import 'rsuite/dist/rsuite.min.css' 
import { DatePicker } from 'rsuite'
import isBefore from 'date-fns/isBefore'

import "react-datepicker/dist/react-datepicker.css"

import { useForm } from "../../../hooks/useForm"
import { AuthContext } from "../../../auth"
import { Detalle } from "./Detalle"

export const Create = ({ fetchSimulaciones }) => {
    const urlBase = import.meta.env.VITE_APP_ENDPOINT
    const { user, logout } = useContext( AuthContext )

    const [ simulacion, setsimulacion ] = useState(false)

    const { formState, onInputChange, onResetForm, onDatePickerChange} = useForm({
      monto: 0,
      termino_pago: '',
      fecha_inicio: '',
      fecha_fin: ''
    });

    const { monto, termino_pago, fecha_inicio, fecha_fin } = formState
  
    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = user.token
        const response = await fetch(`${urlBase}api/simulaciones/create`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              monto: monto,
              termino_pago: termino_pago,
              fecha_inicio: fecha_inicio,
              fecha_fin: fecha_fin
            })
        })
        if (response.status != 201) {
          if (response.status == 401) {
            alert('Su sesion ha expirado!!')
            logout()
          }
          const errores =  await response.json()

          alert(errores.error.join('\n'))
          return false
        }
        const data = await response.json()
        setsimulacion(data)
        fetchSimulaciones()


        // Reset form y componente
        let calendars = document.querySelectorAll('.rs-picker-clean')
        calendars.forEach(el => el.click())
        document.querySelector('.form-select').value = ''
        onResetForm()
    }

    const onReset = () => {
      setsimulacion(false)
    }

  return (

    <div className="container">
        <form className="row col-md-6 g-2 needs-validation" onSubmit={handleSubmit}>
          <div className="col-md-6 position-relative">
            <label htmlFor="monto" className="form-label">Monto *</label>
            <input type="number" className="form-control" name="monto" id="monto" value={ monto } onChange={ onInputChange } required/>
          </div>
          <div className="col-md-6 position-relative">
            <label htmlFor="tipoDocumento" className="form-label">Término de pago *</label>
            <select className="form-select" name="termino_pago" id="termino_pago" defaultValue={ termino_pago } onChange={ onInputChange } required>
              <option value="">Seleccionar...</option>
              <option value="0">Mensual</option>
              <option value="1">Anual</option>
            </select>
          </div>
          <div className="col-md-6 position-relative">
            <label htmlFor="fecha_inicio" className="col-12 form-label">Fecha inicio *</label>
            <DatePicker defaultValue={new Date()} shouldDisableDate={date => isBefore(date, new Date())} oneTap format="yyyy-MM-dd" selected={ fecha_inicio } onChange={ (date) => onDatePickerChange('fecha_inicio',date) } />
          </div>
          <div className="col-md-6 position-relative">
            <label htmlFor="fecha_fin" className="col-12 form-label">Fecha finalizacion *</label>
            <DatePicker defaultValue={new Date()} shouldDisableDate={date => isBefore(date, new Date())} oneTap format="yyyy-MM-dd" selected={ fecha_fin } onChange={ (date) => onDatePickerChange('fecha_fin',date) } />
          </div>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2 pb-4">
            <button className="btn btn-primary me-md-2" type="submit">Consultar</button>
            {
              !simulacion
              ? ''
              : <button className="btn btn-default me-md-2" onClick={onReset}>Nuevo</button>
            }
          </div>
        </form>
        {
          !simulacion
          ? ''
          : <Detalle simulacion={ simulacion } />
        }
    </div>
  )
}
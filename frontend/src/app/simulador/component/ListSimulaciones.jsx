import { Link } from 'react-router-dom';
const text_termino = [
  "MENSUAL",
  "ANUAL"
]

export const ListSimulaciones = ({simulaciones, handleUpdate, handleDelete}) => {
  if (simulaciones.length == 0) return (<></>)

  return (
    <>
      {
        simulaciones.map((simulacion, index) => (
          <tr key={simulacion.id}>
            <td>{index + 1}</td>
            <td>{ new Date(simulacion.create_at).toLocaleDateString()}</td>
            <td>{ simulacion.monto }</td>
            <td>{ text_termino[simulacion.termino_pago] }</td>
            <td>{ new Date(simulacion.fecha_inicio).toLocaleDateString()}</td>
            <td>{ new Date(simulacion.fecha_fin).toLocaleDateString()}</td>
            <th scope="row">{ simulacion.tasa }</th>
            <td>
              <a onClick={ () => handleUpdate(simulacion.id) }><i className="m-2 bi-pencil-square text-primary"></i></a>
              <a onClick={ () => handleDelete(simulacion.id) }><i className="bi bi-trash text-danger"></i></a>
            </td>
          </tr>
        ))
      }
    </>
  )
}

export const Detalle = ({simulacion}) => {

  return (
    <>
        <h3 className="pb-3">
            Detalle simulacion
        </h3>
        <div className="row justify-content-center">
            <div className="w-50">
                <table className="table table-responsive">
                    <tbody>
                        <tr>
                            <th scope="row">Monto</th>
                            <td>$ { simulacion.monto }</td>
                        </tr>
                        <tr>
                            <th scope="row">Término de pago</th>
                            <td>{ simulacion.text_tipo_pago }</td>
                        </tr>
                        <tr>
                            <th scope="row">Fecha inicio</th>
                            <td>{ new Date(simulacion.fecha_inicio).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <th scope="row">Fecha fin</th>
                            <td>{ new Date(simulacion.fecha_fin).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tasa de interes</th>
                            <td>{ simulacion.tasa } %</td>
                        </tr>
                        <tr>
                            <th scope="row">Valor pagado</th>
                            <td>$ { simulacion.valor_pagar }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

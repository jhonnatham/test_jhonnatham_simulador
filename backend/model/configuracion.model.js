
const database = require('../config/database.config.js')

const get = async (clave) => {
    try {
        configuracion = database.query(`
            SELECT *
            FROM simulacion."Configuracion"
            WHERE clave = '${clave}'
        `)
        .then( response => {
            if (response.rowCount == 0) {
                false
            }
            return response.rows[0]
        })
        .catch(err => {
            console.log(err)
            return false
        })
    } catch (error) {
        configuracion =  false
    }
    return configuracion
}

module.exports = {
    get
}

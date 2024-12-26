
const database = require('../config/database.config.js')

const get = async (id) => {
    try {
        simulacion = database.query(`
            SELECT *
            FROM simulacion."Simulaciones"
            WHERE id = ${id}
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
        simulacion =  false
    }
    return simulacion
}

const getSimulacionUser = async (idUser) => {
    try {
        rows = database.query(`
            SELECT *
            FROM simulacion."Simulaciones"
            WHERE usuario_id = ${idUser}
            ORDER BY id DESC;
        `)
        .then( response => {
            return response.rows
        })
        .catch(err => {
            console.log(err)
            return false
        })
    } catch (error) {
        rows =  false
    }
    return rows
}

const find = async (id) => {
    try {
        hogares = database.query(`
            SELECT *
            FROM simulacion."Simulaciones"
            WHERE id = ${id}
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
        hogares = false
    }
    return hogares
}

const create = async ({usuario_id, monto, termino_pago, fecha_inicio, fecha_fin, tasa}) => {
    let res = false
    try {
        const queryText = `INSERT INTO simulacion."Simulaciones" (usuario_id, monto, termino_pago, fecha_inicio, fecha_fin, tasa) 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`
        res = await database.query(queryText, [usuario_id, monto, termino_pago, fecha_inicio, fecha_fin, tasa])
    } catch (e) {
        throw e
    } 

    if (res == false) {
        return false
    }
    return res.rows[0].id
}

const update = async ({id, monto, termino_pago, fecha_inicio, fecha_fin, tasa}) => {
    let res = false
    try {
        await database.query('BEGIN')
        const queryText = `UPDATE simulacion."Simulaciones" 
        SET monto=$2, termino_pago=$3, fecha_inicio=$4, fecha_fin=$5, tasa=$6, create_at=now() WHERE id = $1 RETURNING id`
        res = await database.query(queryText, [id, monto, termino_pago, fecha_inicio, fecha_fin, tasa])
        await database.query('COMMIT')
    } catch (e) {
        await database.query('ROLLBACK')
        throw e
    } 

    if (res == false) {
        return false
    }
    return res.rows[0].id
}

const deleteOne = async ({id}) => {
    let res = false
    try {
        const queryText = `DELETE FROM simulacion."Simulaciones" WHERE id = $1`
        res = await database.query(queryText, [id])
    } catch (e) {
        throw e
    } 

    if (res == false) {
        return false
    }
    return true
}

module.exports = {
    get,
    getSimulacionUser,
    find,
    create,
    update,
    deleteOne
}

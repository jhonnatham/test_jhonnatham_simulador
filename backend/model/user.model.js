const database = require('../config/database.config.js')

const findEmail = async (email) => {
    try {
        user = database.query(`
            SELECT *
            FROM simulacion."Usuarios"
            WHERE email LIKE '${ email }'
            LIMIT 1;
        `)
        .then( response => {
            if (response.rowCount == 0) {
                return false
            }
            return response.rows[0]
        })
        .catch(err => {
            console.log(err)
            return false
        })
    } catch (error) {
        user = false
    }
    return user
}

const create = async ({email, password}) => {
    let res = false
    try {
        const queryText = `INSERT INTO simulacion."Usuarios"(email, password) VALUES($1, $2) RETURNING id`
        res = await database.query(queryText, [email, password])
    } catch (e) {
        throw e
    } 

    if (res == false) {
        return false
    }
    return res.rows[0].id
}

module.exports = {
    findEmail,
    create
}

const express = require('express')
const router = express.Router()

const usersdb = require('../model/user.model.js')
const security = require('../utils/security.util.js')


// validate request
const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});

/**
 * GET
 */

router.get('/:userid([0-9]+)', async (req, res) => {
    const user = await usersdb.get(req.params.userid)

    if (!user) {
        res.status(400).send({error:'El usuario no esta registrada en el sistema'})
    } else {
        res.status(200).send(user)
    }
})

/**
 * END GET
 */

/**
 * POST
 */
router.post('/create', 
[
    check('email', 'Email no puede ser vacio').notEmpty(),
    check('password', 'Pässword no puede ser vacio').notEmpty()
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(400).json({error: errors})
    }
    try {
        const userFind = await usersdb.findEmail(req.body.email)
        if (userFind != false) {
            res.status(409).send({error: "Email ya esta vinculado"})
            return false
        }
        const password = await security.generatePassword(req.body.password) 

        const user = {
            id: 0,
            email: req.body.email,
            password: password
        }

        user.id = await usersdb.create(user)
        if (user.id  === false) throw new Error("Error al crear el usuario")

        user.password = ''
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({error: "Error interno..."})
    }
})

router.post('/validate', 
    [
        check('email', 'Email no puede ser vacio').notEmpty(),
        check('password', 'Pässword no puede ser vacio').notEmpty()
    ],
    async (req, res) => {
        const errors = myValidationResult(req).array();
        if (errors.length > 0) {
            return res.status(400).json({error: errors})
        }

        try {
            const userFind = await usersdb.findEmail(req.body.email)
            if (userFind == false) {
                res.status(403).send({error: "Email no existe"})
                return false
            }

            const email = userFind.email
            const idUser = userFind.id
            const validate = await security.validatePassword(req.body.password, userFind.password)

            if (validate) {
                const token = await security.generateJWT({idUser,email})
                res.status(200).send({ token:token })
            } else {
                res.status(401).send({ error: "No autorizado" })
            }
            return false
        } catch (error) {
            console.error(error)
            res.status(500).send({error: "Error interno..."})
        }
    })
/**
 * END POST
 */


module.exports = router
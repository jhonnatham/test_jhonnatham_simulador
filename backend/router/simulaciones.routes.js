const express = require('express')
const router = express.Router()

const simulacionesdb = require('../model/simulacion.model')
const configuraciondb = require('../model/configuracion.model')


// validate request
const { check, validationResult } = require('express-validator');
const { diffMoth, diffYear } = require('../utils/tasas.util');
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});
/**
 * GET
 */

router.get('/', async (req, res) => {
    const simulaciones = await simulacionesdb.getSimulacionUser(res.user.idUser)
    if (simulaciones === false) {
        res.status(500).send({error: "Error interno..."})
    } else {
        res.status(200).send(simulaciones)
    } 
})

router.get('/:id([0-9]+)', async (req, res) => {
    const simulacion = await simulacionesdb.get(req.params.id)
    
    if (!simulacion) {
        res.status(404).send({error: 'La simulacion no existe!!'})
    } else {
        simulacion.text_tipo_pago = (simulacion.termino_pago == 0) ? 'MENSUAL' : 'ANUAL'

        let tiempo = 1
        if (simulacion.termino_pago == 0)
            tiempo = await diffMoth(simulacion.fecha_inicio, simulacion.fecha_fin)
        else
            tiempo = await diffYear(simulacion.fecha_inicio, simulacion.fecha_fin)

        simulacion.valor_pagar = simulacion.monto + ((simulacion.monto * (simulacion.tasa/100)) * tiempo)
        simulacion.valor_pagar = Number.parseFloat(simulacion.valor_pagar).toFixed(0)
        res.status(200).send(simulacion)
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
    check('monto', 'El monto es obligatorio').notEmpty().isInt({min: 1}),
    check('termino_pago', 'El termino de pago es obligatorio').notEmpty(),
    check('fecha_inicio', 'Fecha inicio es obligatoria').notEmpty(),
    check('fecha_fin', 'Fecha fin es obligatoria').notEmpty()
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({error: errors})
    }

    try {
        const text_tipo_pago = (req.body.termino_pago == 0) ? 'MENSUAL' : 'ANUAL'
        const confTasas = await configuraciondb.get(text_tipo_pago)
        const tasa = confTasas.valor
        const simulacion = {
            id: 0,
            usuario_id: res.user.idUser,
            monto: req.body.monto,
            termino_pago: req.body.termino_pago,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            tasa: tasa
        }
    
        simulacion.id = await simulacionesdb.create(simulacion)

        const simulacion_return = await simulacionesdb.get(simulacion.id)
        simulacion_return.text_tipo_pago = (simulacion_return.termino_pago == 0) ? 'MENSUAL' : 'ANUAL'

        let tiempo = 1
        if (simulacion_return.termino_pago == 0)
            tiempo = await diffMoth(simulacion_return.fecha_inicio, simulacion_return.fecha_fin)
        else
            tiempo = await diffYear(simulacion_return.fecha_inicio, simulacion_return.fecha_fin)

        simulacion_return.valor_pagar = simulacion_return.monto + ((simulacion_return.monto * (tasa/100)) * tiempo)
        simulacion_return.valor_pagar = Number.parseFloat(simulacion_return.valor_pagar).toFixed(0)
        res.status(201).send(simulacion_return)
    } catch (error) {
        console.error(error)
        res.status(500).send({error: "Error interno..."})
    }
})

/**
 * END POST
 */

/**
 * PUT
 */
router.put('/:id', 
[
    check('monto', 'El monto es obligatorio').notEmpty(),
    check('termino_pago', 'El termino de pago es obligatorio').notEmpty(),
    check('fecha_inicio', 'Fecha inicio es obligatoria').notEmpty(),
    check('fecha_fin', 'Fecha fin es obligatoria').notEmpty()
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({error: errors})
    }

    try {
        let simulacion = await simulacionesdb.get(req.params.id)
        if (!simulacion) return res.status(404).send('Simulacion no existe')

        const text_tipo_pago = (req.body.termino_pago == 0) ? 'MENSUAL' : 'ANUAL'
        const confTasas = await configuraciondb.get(text_tipo_pago)
        simulacion.tasa = confTasas.valor

        simulacion.monto = req.body.monto
        simulacion.termino_pago = req.body.termino_pago
        simulacion.fecha_inicio = req.body.fecha_inicio
        simulacion.fecha_fin = req.body.fecha_fin

        simulacion.id = await simulacionesdb.update(simulacion)

        res.status(204).send()
    } catch (error) {
        console.error(error)
        res.status(500).send({error: "Error interno..."})
    }
})

/**
 * END PUT
 */

/**
 * DELETE
 */

router.delete('/:id', async (req, res) => {
    try {

        let simulacion = await simulacionesdb.get(req.params.id)
        if (!simulacion) return res.status(404).send('Simulacion no existe')

        const result = await simulacionesdb.deleteOne(simulacion)

        res.status(200).send("Simulacion eliminada")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/**
 * END DELETE
 */

module.exports = router